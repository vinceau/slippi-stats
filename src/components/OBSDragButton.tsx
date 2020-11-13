/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React from "react";

import obsImage from "../styles/images/obs.png";

const Draggable = styled.a`
  color: #cccccc;
  border: solid 0.2rem white;
  background-color: #333333;
  display: inline-block;
  text-decoration: none;
  padding: 1.5rem 3rem;
  cursor: move;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: bold;
`;

export const OBSDragButton: React.FC = () => {
  const wrapperRef = React.useRef(null);
  const pos = 30;
  const handleDragStart = (e: any) => {
    console.log("drag start");
    console.log(e.target);
    const dragged = e.target;
    console.log(dragged.href);
    const img = new Image();
    img.src = obsImage;
    // Customize the visible 'thumbnail' while dragging
    e.dataTransfer.setDragImage(img /*wrapperRef.current*/, pos, pos);
    // Set the data type, and the value. You specifically want text/uri-list.
    e.dataTransfer.setData("text/uri-list", dragged.href);
    // e.preventDefault();
    // e.stopPropagation();
  };
  const handleDragEnd = (e: any) => {
    console.log("end");
    e.target.blur();
  };
  return (
    <Draggable
      href={window.location.href}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onClick={(e) => e.preventDefault()}
      ref={wrapperRef}
    >
      <img style={{ width: "3rem", marginRight: "1rem" }} src={obsImage} /> Drag me into OBS
    </Draggable>
  );
};
