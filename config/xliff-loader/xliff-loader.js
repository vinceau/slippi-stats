const xliff = require("xliff");
const path = require("path");
const targetOfjs = require("xliff/targetOfjs");

module.exports = function (source, map, meta) {
  const filename = path.basename(this.resourcePath);
  console.log(`converting: ${filename} from xliff into json`);
  console.log(source);
  // console.log('content:', source.toString());
  const callback = this.async();

  xliff.xliff2js(source, (err, res) => {
    if (err) {
      console.error(err);
      return callback(err);
    }

    const translation = targetOfjs(res);
    // const result = JSON.stringify({ translation });
    // console.log({ result });
    const value = JSON.stringify({ translation })
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");

    const newSource = `module.exports = ${value}`;
    console.log({ newSource });
    callback(null, newSource, map, meta);
  });
};

// module.exports.raw = true;
