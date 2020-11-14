import styled from "@emotion/styled";
import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";

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
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-color: ${(props) => getColor(props)};
  border-style: dashed;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  outline: none;
  transition: border 0.24s ease-in-out;
  p {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
  }
`;

export const DropPad: React.FC<Partial<DropzoneOptions>> = (props) => {
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(props);

  return (
    <Container {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      <p>Drag SLP files here or click to select</p>
    </Container>
  );
};
