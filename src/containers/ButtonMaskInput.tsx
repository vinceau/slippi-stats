/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import React, { useContext, useState } from "react";
import { Types, AppContext } from "../store";
import { ControllerDisplay } from "../components/ControllerDisplay";
import { ButtonInput } from "react-gamecube";
import { BitmaskDisplay } from "../components/BitmaskDisplay";
import { OrderedButtonPreview } from "../components/OrderedButtonPreview";

export const ButtonMaskInput: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [error, setError] = useState<string>("");

  const setBitmask = (mask: number) => {
    dispatch({
      type: Types.SetBitmask,
      payload: {
        mask,
      },
    });
  };

  const onChange = (value: string) => {
    if (isNaN(+value)) {
      setError("Invalid number");
    } else {
      setError("");
      setBitmask(+value);
    }
  };

  const onButtonClick = (button: ButtonInput): void => {
    dispatch({
      type: Types.ToggleButton,
      payload: {
        button,
      },
    });
  };

  return (
    <div>
      <div
        css={css`
          margin: 20px 0;
        `}
      >
        <input
          css={css`
            border: solid 1px white;
            background: transparent;
            border-radius: 5px;
            padding: 10px 20px;
            color: white;
            margin-bottom: 5px;
            width: 250px;
            max-width: 100%;
            font-size: 16px;
          `}
          onChange={({ target }) => onChange(target.value)}
          placeholder="Enter a decimal bitmask here"
        />
        <div
          css={css`
            min-height: 21px;
          `}
        >
          {error}
        </div>
      </div>
      <div
        css={css`
          margin-bottom: 40px;
        `}
      >
        <BitmaskDisplay mask={state.mask} />
      </div>
      <ControllerDisplay buttons={state.buttons} onClick={onButtonClick} />
      <div
        css={css`
          font-size: 24px;
          margin-top: 20px;
          min-height: 32px;
        `}
      >
        <OrderedButtonPreview value={state.buttons} />
      </div>
    </div>
  );
};
