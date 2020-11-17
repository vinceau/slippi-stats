import React from "react";
import { hot } from "react-hot-loader/root";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RandomView } from "views/RandomView";

import { AppProvider } from "./store";
import { MainView } from "./views/MainView";
import { RenderView } from "./views/RenderView";

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/" component={MainView} />
        <Route path="/render" component={RenderView} />
        <Route path="/random" component={RandomView} />
      </Router>
    </AppProvider>
  );
};

export default hot(App);
