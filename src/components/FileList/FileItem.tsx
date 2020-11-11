import React from "react";
import { ProcessedFile } from "store/types";

export const FileItem: React.FC<ProcessedFile> = (props) => {
  const { file, loading, error } = props;
  return (
    <div>
      {file.name} {loading && <span>processing...</span>} {error && <span>error :c</span>}
    </div>
  );
};
