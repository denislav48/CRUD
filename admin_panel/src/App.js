import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UsersList from "./components/UsersList";

function App() {
  const [page, setPage] = useState(1);

  
 
  function onPageChange(page) {

    setPage(page);
  }
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            
          </Route>
          <Route path="/users">
           
          </Route>
          <Route path="/">
            <UsersList change={onPageChange} page={page}></UsersList>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
