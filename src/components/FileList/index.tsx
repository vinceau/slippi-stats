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
    <div
      css={css`
        max-height: 500px;
        overflow-y: auto;
      `}
    >
      {files.map((f) => (
        <FileItem key={f.filename} {...f} />
      ))}
    </div>
  );
};
