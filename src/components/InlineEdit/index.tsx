// From: https://dev.to/joelmturner/build-an-inline-edit-text-input-with-react-hooks-4nah

import "./index.scss";

import { useKeyPress, useOnClickOutside } from "lib/hooks";
import React, { useEffect, useRef, useState } from "react";

export interface InlineEditProps {
  text: string;
  textAlign?: "left" | "right";
  onSetText: (text: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  placeholder?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = (props) => {
  const { text, onSetText, textAlign, placeholder } = props;
  const [isInputActive, _setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState(text);

  const setIsInputActive = React.useCallback(
    (isActive: boolean) => {
      if (isActive !== isInputActive) {
        // Value has changed
        if (isActive && props.onFocus) {
          props.onFocus();
        }

        if (!isActive && props.onBlur) {
          props.onBlur();
        }
      }
      _setIsInputActive(isActive);
    },
    [isInputActive, props]
  );

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
      onSetText(inputValue);
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
        onSetText(inputValue);
        setIsInputActive(false);
      }
      // if Escape is pressed, revert the text and close the editor
      if (esc) {
        setInputValue(props.text);
        setIsInputActive(false);
      }
    }
  }, [tab, enter, esc, isInputActive, onSetText, setIsInputActive, inputValue, props.text]); // watch for key presses

  return (
    <span className="inline-text" ref={wrapperRef}>
      <span
        ref={textRef}
        onClick={() => setIsInputActive(true)}
        className={`inline-text_copy inline-text_copy--${!isInputActive ? "active" : "hidden"}`}
      >
        {props.text || placeholder}
      </span>
      <input
        ref={inputRef}
        style={{ textAlign, maxWidth: "100%" }}
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSetText: () => {},
};
