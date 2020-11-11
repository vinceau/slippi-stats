// From: https://dev.to/joelmturner/build-an-inline-edit-text-input-with-react-hooks-4nah

import React, { useState, useEffect, useRef } from "react";
import { useKeyPress, useOnClickOutside } from "../../lib/hooks";

import "./index.scss";

export const InlineEdit: React.FC<{
  text: string;
  onSetText: (text: string) => void;
}> = (props) => {
  const { text, onSetText } = props;
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const tab = useKeyPress("Tab");
  const enter = useKeyPress("Enter");
  const esc = useKeyPress("Escape");

  useEffect(() => {
    setInputValue(text);
  }, [text]);

  // check to see if the user clicked outside of this component
  useOnClickOutside(wrapperRef, () => {
    if (isInputActive) {
      props.onSetText(inputValue);
      setIsInputActive(false);
    }
  });

  // focus the cursor in the input field on edit start
  useEffect(() => {
    if (isInputActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isInputActive]);

  useEffect(() => {
    if (isInputActive) {
      // if Enter or tab is pressed, save the text and case the editor
      if (enter || tab) {
        props.onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [tab, enter, esc]); // watch for key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${!isInputActive ? "active" : "hidden"}`}
      >
        {props.text}
      </span>
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        className={`inline-text_input inline-text_input--${isInputActive ? "active" : "hidden"}`}
      />
    </span>
  );
};

InlineEdit.defaultProps = {
  text: "",
  onSetText: () => {},
};