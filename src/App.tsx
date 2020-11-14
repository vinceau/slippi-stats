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
      {/* We have to define the basename here as the Github pages URL segment or the SPA won't work. */}
      <Router basename="/slippi-stats">
        <Route exact path="/" component={MainView} />
        <Route path="/render" component={RenderView} />
        <Route path="/random" component={RandomView} />
      </Router>
    </AppProvider>
  );
};

export default hot(App);
