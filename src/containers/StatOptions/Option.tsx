import styled from "@emotion/styled";
import React from "react";

const Outer = styled.div<{
  checked?: boolean;
  isDragging?: boolean;
}>`
  opacity: ${(p) => (p.checked ? "1" : "0.5")};
  background-color: ${(p) => (p.isDragging ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.3)")};
  color: white;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: ${(p) => (p.checked ? "600" : "100")};
  ${(p) =>
    p.isDragging
      ? `
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    opacity: 1;
`
      : ""}

  .title {
    cursor: pointer;
    user-select: none;
    & > input[type="checkbox"] {
      margin-right: 1rem;
    }
  }
  .handle {
    display: flex;
  }
`;

export interface OptionProps extends Record<string, any> {
  name: string;
  checked?: boolean;
  draggable?: boolean;
  onChange: (checked: boolean) => void;
  handleProps?: Record<string, any>;
}

export const Option: React.FC<OptionProps> = (props) => {
  const { name, checked, draggable, onChange, handleProps, children, ...rest } = props;
  const toggle = () => props.onChange(!props.checked);
  return (
    <Outer checked={props.checked} {...rest}>
      <label className="title">
        <input type="checkbox" checked={props.checked} onChange={toggle} />
        {name}
      </label>
      {draggable && (
        <div className="handle" {...handleProps}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z" fill="#ffffff" />
          </svg>
        </div>
      )}
    </Outer>
  );
};
