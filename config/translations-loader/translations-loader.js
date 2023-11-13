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

  // Finally, emit the imported audio file's "source"
  // in the webpack's build directory using a built-in
  // "emitFile" method.
  this.emitFile(filename, source, null, assetInfo);

  // const result = ts.transpile(source, { module: ts.ModuleKind.CommonJS });
  // console.log({ result });

  const sourceFile = ts.createSourceFile(this.resourcePath, source, ts.ScriptTarget.Latest);
  console.log(sourceFile.getChildren());
  // printRecursiveFrom(sourceFile, 0, sourceFile);

  console.log(`\n\n\n>>> end processing ${this.resourcePath} <<<\n\n\n`);
  return source;
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
