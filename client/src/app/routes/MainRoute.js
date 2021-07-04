import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "../pages/access-account/Registration";

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Registration} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
