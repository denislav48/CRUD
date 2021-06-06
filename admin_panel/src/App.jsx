import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UsersList from "./components/UsersList";
import AddEditUser from "./components/AddEditUser";
import LoginRegisterForm from "./components/LoginRegisterForm";

function App() {
  let accessToken = sessionStorage.getItem("accessToken");
  console.log(accessToken);

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

        {/* <GuardedRoute to="/users"  component={UsersList} auth={accessToken}/> */}
          <Route exact path="/">
            {!accessToken ? <Redirect to="/login" /> : <Redirect to="/users" />}
          </Route>
          {!accessToken ? (
            <Route exact path="/login" component={LoginRegisterForm} />
          ) : (
            <Route exact path="/users" component={UsersList} />
          )}
          <Route exact path="/login">
            <Redirect to="/users" />
          </Route>
          <Route exact path="/users" component={UsersList} />

          <Route exact path="/register" component={LoginRegisterForm} />

          {/* <Route exact path="/login">
            {!accessToken ? <Redirect to="/login" ></Redirect> : <Redirect to="/users" />}
          </Route> */}

          <Route exact path="/edit/:id" component={AddEditUser} />

          <Route exact path="/addUser" component={AddEditUser} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
