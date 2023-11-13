const path = require("path");

module.exports = function (source) {
  // webpack exposes an absolute path to the imported module
  // under the "this.resourcePath" property. Get the file name
  // of the imported module. For example:
  // "/User/admin/audio.mp3" (this.resourcePath) -> "audio.mp3".
  const filename = path.basename(this.resourcePath);
  console.log(`processing ${this.resourcePath}: ${source}`);

  // Next, create an asset info object.
  // webpack uses this object when outputting the build's stats,
  // so you could see info about the emitted asset.
  const assetInfo = { sourceFilename: filename };

  // Finally, emit the imported audio file's "source"
  // in the webpack's build directory using a built-in
  // "emitFile" method.
  this.emitFile(filename, source, null, assetInfo);

  // For now, return the mp3 binary as-is.
  return source;
};
