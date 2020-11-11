import React from "react";
import { hot } from "react-hot-loader/root";
import { HashRouter as Router, Route } from "react-router-dom";

import { AppProvider } from "./store";
import { MainView } from "./views/MainView";
import { RenderView } from "./views/RenderView";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router basename="/">
        <Route exact path="/" component={MainView} />
        <Route path="/render" component={RenderView} />
      </Router>
    </AppProvider>
  );
};

export default hot(App);
