import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import styled from "@emotion/styled";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

export const DropPad: React.FC<Partial<DropzoneOptions>> = (props) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(props);

  return (
    <div className="container">
      <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
    </div>
  );
};
