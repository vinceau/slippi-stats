/** @jsx jsx */
import { css, Global, jsx } from "@emotion/core";

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
}

export const defaultTheme: Theme = {
  primaryColor: "#286163",
  secondaryColor: "#121020",
};

export const GlobalTheme: React.FC<Theme> = ({ primaryColor, secondaryColor }) => {
  return (
    <Global
      styles={css`
        body.themed::before {
          content: "";
          position: fixed;
          top: 0;
          background: radial-gradient(circle at center -30%, ${primaryColor}, ${secondaryColor});
          height: 100%;
          width: 100%;
          z-index: -1;
        }
      `}
    />
  );
};
