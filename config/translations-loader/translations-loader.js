const path = require("path");
const ts = require("typescript");

module.exports = function (source) {
  // webpack exposes an absolute path to the imported module
  // under the "this.resourcePath" property. Get the file name
  // of the imported module. For example:
  // "/User/admin/audio.mp3" (this.resourcePath) -> "audio.mp3".
  const filename = path.basename(this.resourcePath);
  console.log(`\n\n\n>>> start processing ${this.resourcePath} <<<\n\n\n`);

  // Next, create an asset info object.
  // webpack uses this object when outputting the build's stats,
  // so you could see info about the emitted asset.
  const assetInfo = { sourceFilename: filename };

  const sourceFile = ts.createSourceFile(this.resourcePath, source, ts.ScriptTarget.Latest);

  const transformerFactory = (context) => {
    return (rootNode) => {
      function visit(node) {
        node = ts.visitEachChild(node, visit, context);
        if (ts.isReturnStatement(node)) {
          // return ts.createReturnStatement();
          return ts.factory.createReturnStatement(ts.createIdentifier('i18next.t("something")'));
        }

        // if (ts.isIdentifier(node)) {
        //     return ts.createIdentifier(node.text + "suffix");
        // } else {
        //     return node;
        // }
        return node;
      }

      return ts.visitNode(rootNode, visit);
    };
  };

  const transformationResult = ts.transform(sourceFile, [transformerFactory]);

  // ts.factory.createReturnStatement

  const transformedSourceFile = transformationResult.transformed[0];
  const printer = ts.createPrinter();

  const result = printer.printNode(ts.EmitHint.Unspecified, transformedSourceFile, undefined);

  console.log(`\n\n\n>>> end processing ${this.resourcePath} <<<\n\n\n`);

  const newSource = result; // source;

  console.log(newSource);

  // Finally, emit the imported audio file's "source"
  // in the webpack's build directory using a built-in
  // "emitFile" method.
  this.emitFile(filename, newSource, null, assetInfo);

  // const result = ts.transpile(source, { module: ts.ModuleKind.CommonJS });
  // console.log({ result });

  // const sourceFile = ts.createSourceFile(this.resourcePath, source, ts.ScriptTarget.Latest);
  // console.log(sourceFile.getChildren());
  // printRecursiveFrom(sourceFile, 0, sourceFile);

  return newSource;
};

// function findExports(node) {
// }

function printRecursiveFrom(node, indentLevel, sourceFile) {
  const indentation = "-".repeat(indentLevel);
  const syntaxKind = ts.SyntaxKind[node.kind];
  const nodeText = node.getText(sourceFile);
  console.log(`${indentation}${syntaxKind}: ${nodeText}`);

  node.forEachChild((child) => printRecursiveFrom(child, indentLevel + 1, sourceFile));
}
