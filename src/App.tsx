import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RandomView } from "views/RandomView";

import { AppProvider } from "./store";
import { MainView } from "./views/MainView";
import { RenderView } from "./views/RenderView";

const App: React.FC = () => {
  let basename = ".";
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    basename = process.env.PUBLIC_URL;
  } else {
    basename = "/slippi-stats";
  }
  return (
    <AppProvider>
      <Router basename={basename}>
        <Route exact path="/" component={MainView} />
        <Route path="/render" component={RenderView} />
        <Route path="/random" component={RandomView} />
      </Router>
    </AppProvider>
  );
};

export default hot(App);
