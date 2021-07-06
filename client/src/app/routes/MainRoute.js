import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "../pages/access-account/Registration";
import Login from "../pages/login-account/Login";

const MainRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
};

export default MainRoute;
