declare class FileReaderSync {
  constructor();

  public readAsBinaryString(blob: Blob): any;
  public readAsArrayBuffer(blob: Blob): any;
}
