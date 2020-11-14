import styled from "@emotion/styled";
import React from "react";

import obsImage from "../styles/images/obs.png";

const OBS_PARAMS = new URLSearchParams({
  "layer-name": "Slippi Stats",
  "layer-width": "1920",
  "layer-height": "1080",
});

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
  const location = `${window.location.href}&${OBS_PARAMS.toString()}`;
  const wrapperRef = React.useRef(null);
  const pos = 30;
  const handleDragStart = (e: any) => {
    const img = new Image();
    img.src = obsImage;
    // Customize the visible 'thumbnail' while dragging
    e.dataTransfer.setDragImage(img, pos, pos);
    // Set the data type, and the value. You specifically want text/uri-list.
    e.dataTransfer.setData("text/uri-list", e.target.href);
  };
  const handleDragEnd = (e: any) => e.target.blur();
  return (
    <Draggable
      href={location}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      onClick={(e) => e.preventDefault()}
      ref={wrapperRef}
    >
      <img style={{ width: "3rem", marginRight: "1rem" }} src={obsImage} alt="OBS Logo" /> Drag me into OBS
    </Draggable>
  );
};
