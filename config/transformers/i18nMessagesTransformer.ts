// transformers/i18nMessagesTransformer.ts
import ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

export interface I18nTransformerOptions {
  /** Write XLIFF to this path, e.g. "<projectRoot>/i18n/messages.xliff" */
  xliffOutputPath: string;
  /** Write default JSON to this path, e.g. "<projectRoot>/i18n/en.json" */
  jsonOutputPath: string;
  /** XLIFF attributes */
  srcLang?: string; // e.g. "en-US"
  trgLang?: string; // e.g. "de"
  fileId?: string; // e.g. "translation"
  /** Hash length (hex). 8–12 is a good range. */
  hashLength?: number;
  /** Optional: only process files that end with ".messages.ts" (default true) */
  onlyMessagesFiles?: boolean;
}

/**
 * Singleton store for the whole emit—persists across all SourceFiles in one compilation.
 */
const globalStore: {
  seen: Map<string, string>; // hash -> source text
  reverse: Map<string, string>; // source text -> hash (for idempotence)
} = {
  seen: new Map(),
  reverse: new Map(),
};

function stableHash(text: string, hashLength = 10): string {
  // SHA1 -> hex -> slice
  const h = crypto.createHash("sha1").update(text, "utf8").digest("hex");
  return h.slice(0, Math.max(4, hashLength)); // guard min length
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function writeDefaultJson(filePath: string, pairs: Map<string, string>) {
  // Ensure directory
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const json = JSON.stringify(Object.fromEntries(pairs), null, 2);
  fs.writeFileSync(filePath, json, "utf8");
}

function writeXliff(
  xliffPath: string,
  pairs: Map<string, string>,
  srcLang = "en-US",
  trgLang = "de",
  fileId = "translation"
) {
  // Ensure directory
  fs.mkdirSync(path.dirname(xliffPath), { recursive: true });

  const units = Array.from(pairs.entries())
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([id, source]) => {
      return [
        `    <unit id="${escapeXml(id)}">`,
        `      <segment>`,
        `        <source>${escapeXml(source)}</source>`,
        `        <target>something else</target>`,
        `      </segment>`,
        `    </unit>`,
      ].join("\n");
    })
    .join("\n");

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="${escapeXml(
      srcLang
    )}" trgLang="${escapeXml(trgLang)}">`,
    `  <file id="${escapeXml(fileId)}">`,
    units,
    `  </file>`,
    `</xliff>`,
    ``,
  ].join("\n");

  fs.writeFileSync(xliffPath, xml, "utf8");
}

/**
 * Detect arrow function OR function expression returning a *string literal*.
 * Returns the extracted string or null if not eligible.
 */
function extractReturnStringLiteral(fn: ts.ArrowFunction | ts.FunctionExpression): string | null {
  // () => "text"
  if (ts.isStringLiteral(fn.body)) {
    return fn.body.text;
  }
  // () => { return "text"; }
  if (ts.isBlock(fn.body)) {
    const stmts = fn.body.statements;
    if (stmts.length === 1 && ts.isReturnStatement(stmts[0])) {
      const ret = stmts[0].expression;
      if (ret && ts.isStringLiteral(ret)) {
        return ret.text;
      }
    }
  }
  return null;
}

export default function i18nMessagesTransformer(
  program: ts.Program,
  options: I18nTransformerOptions
): ts.TransformerFactory<ts.SourceFile> {
  console.log("i18nMessagesTransformer", options);

  // const checker = program.getTypeChecker();
  const {
    xliffOutputPath,
    jsonOutputPath,
    srcLang = "en-US",
    trgLang = "de",
    fileId = "translation",
    hashLength = 10,
    onlyMessagesFiles = true,
  } = options || ({} as I18nTransformerOptions);

  if (!xliffOutputPath) {
    throw new Error("[i18nMessagesTransformer] 'xliffOutputPath' option is required.");
  }

  return (context: ts.TransformationContext) => {
    const f = context.factory;

    // Build window.i18next.t("hash") call
    const makeI18nextCall = (hashId: string): ts.CallExpression => {
      const windowIdent = f.createIdentifier("window");
      const i18nextAccess = f.createPropertyAccessExpression(windowIdent, "i18next");
      const tAccess = f.createPropertyAccessExpression(i18nextAccess, "t");
      return f.createCallExpression(tAccess, /*typeArgs*/ undefined, [f.createStringLiteral(hashId)]);
    };

    const visitNode: ts.Visitor = (node) => {
      if (
        ts.isPropertyAssignment(node) &&
        (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
      ) {
        const fn = node.initializer as ts.ArrowFunction | ts.FunctionExpression;
        const original = extractReturnStringLiteral(fn);

        if (original !== null) {
          // Reuse previous hash for identical strings
          let id = globalStore.reverse.get(original);
          if (!id) {
            id = stableHash(original, hashLength);
            // In (very unlikely) collision cases, extend the hash until unique
            while (globalStore.seen.has(id) && globalStore.seen.get(id) !== original) {
              id = stableHash(original + ":" + id, Math.min(40, hashLength + 2));
            }
            globalStore.seen.set(id, original);
            globalStore.reverse.set(original, id);
          }

          // Rebuild the function with the same parameters, but a call body
          // console.log("id", id);
          const newBodyExpr = makeI18nextCall(id);

          let newFn: ts.ArrowFunction | ts.FunctionExpression;
          if (ts.isArrowFunction(fn)) {
            // keep concise form: () => window.i18next.t("hash")
            newFn = f.updateArrowFunction(
              fn,
              fn.modifiers,
              fn.typeParameters,
              fn.parameters,
              fn.type,
              // ✅ the missing arg:
              fn.equalsGreaterThanToken ?? f.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
              newBodyExpr
            );
          } else {
            // function expression branch unchanged…
            newFn = f.updateFunctionExpression(
              fn,
              fn.modifiers,
              fn.asteriskToken,
              fn.name,
              fn.typeParameters,
              fn.parameters,
              fn.type,
              f.createBlock([f.createReturnStatement(newBodyExpr)], /*multiLine*/ true)
            );
          }

          const updated = f.updatePropertyAssignment(node, node.name, newFn);

          // Write/refresh XLIFF after this file is processed (simple & robust for watch mode)
          // Note: this runs multiple times in large projects, but it's fast and deterministic.
          writeXliff(xliffOutputPath, globalStore.seen, srcLang, trgLang, fileId);
          // console.log("writeXliff", xliffOutputPath, globalStore.seen, srcLang, trgLang, fileId);

          writeDefaultJson(jsonOutputPath, globalStore.seen);

          return updated;
        }
      }

      return ts.visitEachChild(node, visitNode, context);
    };

    return (sf: ts.SourceFile) => ts.visitNode(sf, visitNode);
  };
}
