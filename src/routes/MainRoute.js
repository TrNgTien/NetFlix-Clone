//Packages
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SecurityPage from "../pages/app/SecurityPage"



const MainRoute = () => {
    return (
      <Router>
        <Switch>
          <Route path="/" component={ SecurityPage} />
          
        </Switch>
      </Router>
    );
  };
  
  export default MainRoute; 