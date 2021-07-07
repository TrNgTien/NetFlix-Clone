import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "../pages/access-account/Registration";
import Login from "../pages/access-account/Login";

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Registration} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
