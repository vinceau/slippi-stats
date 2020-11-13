/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React from "react";
import { ProcessedFile } from "store/types";

import { FileItem } from "./FileItem";

export interface FileListProps {
  files: ProcessedFile[];
  onRemove: (filename: string) => void;
}

export const FileList: React.FC<FileListProps> = (props) => {
  const { files, onRemove } = props;
  return (
    <div
      css={css`
        max-height: 500px;
        overflow-y: auto;
      `}
    >
      {files.map((f) => (
        <FileItem key={f.filename} file={f} onRemove={() => onRemove(f.filename)} />
      ))}
    </div>
  );
};
