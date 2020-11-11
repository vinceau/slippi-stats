/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { ProcessedFile } from "store/types";
import { FileItem } from "./FileItem";

export interface FileListProps {
  files: ProcessedFile[];
}

export const FileList: React.FC<FileListProps> = (props) => {
  const { files } = props;
  return (
    <div>
      {files.map((f) => (
        <FileItem key={f.file.name} {...f} />
      ))}
    </div>
  );
};
