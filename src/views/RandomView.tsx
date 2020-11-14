import { generateDemoValues } from "lib/demo";
import { generateSearchParams } from "lib/searchParams";
import React from "react";
import { Redirect } from "react-router-dom";

export const RandomView: React.FC = () => {
  const params = generateDemoValues();
  const search = "?" + generateSearchParams(params).toString();
  return (
    <Redirect
      to={{
        pathname: "/render",
        search,
      }}
    />
  );
};
