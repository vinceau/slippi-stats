export async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onabort = () => reject("file reading was aborted");
    reader.onerror = () => reject("file reading has failed");
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      if (!binaryStr) {
        reject("no contents");
      }
      resolve(binaryStr as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  });
}

export async function readFileAsArrayBuffer(file: File): Promise<string | ArrayBufferLike> {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onabort = () => reject("file reading was aborted");
    fr.onerror = () => reject("file reading has failed");
    if (fr.readAsBinaryString) {
      fr.addEventListener(
        "load",
        function () {
          const string = (this as any).resultString != null ? (this as any).resultString : this.result;
          const result = new Uint8Array(string.length);
          for (let i = 0; i < string.length; i++) {
            result[i] = string.charCodeAt(i);
          }
          resolve(result.buffer);
        },
        false
      );
      fr.readAsBinaryString(file);
    } else {
      fr.addEventListener(
        "load",
        function () {
          if (this.result) {
            resolve(this.result);
          } else {
            reject("no data read");
          }
        },
        false
      );
      fr.readAsArrayBuffer(file);
    }
  });
}
