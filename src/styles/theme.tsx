import { css, Global } from "@emotion/react";

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
        body.themed {
          background: radial-gradient(circle at center -30%, ${primaryColor}, ${secondaryColor});
        }
      `}
    />
  );
};
