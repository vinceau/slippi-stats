/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useOnClickOutside } from "lib/hooks";
import React, { useRef } from "react";
import { ChromePicker } from "react-color";

const ColorSquare = styled.div<{
  size: string;
  color: string;
}>`
  cursor: pointer;
  height: ${(p) => p.size};
  width: ${(p) => p.size};
  border-radius: 0.5rem;
  background-color: ${(p) => p.color};
`;

const ResetButton = styled.div`
  position: absolute;
  transform: translateX(-50%);
  margin-top: 0.2rem;
  margin-left: 50%;
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  &:hover {
    opacity: 1;
  }
`;

export const ColorPicker: React.FC<{
  value: string;
  defaultColor?: string;
  onChange: (val: string) => void;
}> = ({ value, onChange, defaultColor }) => {
  const [show, setShow] = React.useState(false);
  const wrapperRef = useRef(null);
  const showReset = defaultColor && value !== defaultColor;

  useOnClickOutside(wrapperRef, () => {
    if (show) {
      setShow(false);
    }
  });

  const onClick = () => {
    if (!show) {
      setShow(true);
    }
  };

  const resetClick = () => {
    if (defaultColor) {
      onChange(defaultColor);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <ColorSquare color={value} size="5rem" ref={wrapperRef} onClick={onClick}>
        {show && (
          <div
            css={css`
              position: absolute;
              z-index: 9999;
              bottom: 0;
            `}
          >
            <ChromePicker color={value} onChange={(color) => onChange(color.hex)} />
          </div>
        )}
      </ColorSquare>
      {showReset && <ResetButton onClick={resetClick}>RESET</ResetButton>}
    </div>
  );
};
