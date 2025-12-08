import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
// import * as serviceWorker from "./serviceWorker"; // No longer needed - handled by vite-plugin-pwa

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// Note: PWA service worker is now handled by vite-plugin-pwa automatically
// serviceWorker.register();
