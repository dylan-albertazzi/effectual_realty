import logo from './logo.svg';
import './App.css';

import React from "react";
import Amplify from "aws-amplify";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ManageListingPage from "./components/ManageListingPage"

function App() {
  return (
     <Router>
        <div>
          <Switch>
          <Route path="/" exact component={HomePage} />
          <AmplifyAuthenticator>
            <Route path="/manage-listing" exact component={ManageListingPage} />
            </AmplifyAuthenticator>
           
          </Switch>
        </div>
      </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
