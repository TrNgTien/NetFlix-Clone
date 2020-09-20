//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import example from "../pages/app/example"



const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" component={example} />
          
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 