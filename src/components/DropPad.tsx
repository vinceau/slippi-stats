/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const outerStyles = css`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &&:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0.95;
    z-index: -1;
  }
`;

export interface DropPadProps {
  files: any[];
  onDrop: (files: any) => void;
}

export const DropPad: React.FC<DropPadProps> = (props) => {
  const accept = ".slp";
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      props.onDrop(acceptedFiles); //acceptedFiles.map((f: any) => f.path));
    },
    [props]
  );
  const { open, getRootProps, getInputProps /*, isDragActive */ } = useDropzone({
    multiple: true,
    onDrop,
    accept,
    noClick: true,
    noKeyboard: true,
  });
  return (
    <div css={outerStyles} {...getRootProps()}>
      <input {...getInputProps()} />
      {props.files.length > 0 ? (
        props.files.map((f) => <pre key={f.name}>{JSON.stringify(f, null, 2)}</pre>)
      ) : (
        <div>No files selected</div>
      )}
    </div>
  );
};
