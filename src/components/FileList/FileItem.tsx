import { Loader } from "components/Loader";
import React from "react";
import { ProcessedFile } from "store/types";

export const FileItem: React.FC<ProcessedFile> = (props) => {
  const { filename, loading, error } = props;
  return (
    <div>
      {filename} {loading && <Loader />} {error && <span>error :c</span>}
    </div>
  );
};
