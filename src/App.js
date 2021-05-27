import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

  import React from "react";
  import Main from "./Main";
  import Verify from "./Verify";
  
  export default function App() {
	return (
	  <Router>
		<div>
  
		  {/* A <Switch> looks through its children <Route>s and
			  renders the first one that matches the current URL. */}
		  <Switch>
			<Route path="/verify">
			  <Verify />
			</Route>

			<Route path="/">
			  <Main />
			</Route>
		  </Switch>
		</div>
	  </Router>
	);
  }
  
  
  function About() {
	return <h2>About</h2>;
  }
 
  