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
import GuardedRoute from "./components/GuardedRoute";

function App() {
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    setAccessToken(sessionStorage.getItem("accessToken"));
  }, [token]);

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
          <Route exact path="/">
            {!accessToken ? <Redirect to="/login" /> : <Redirect to="/users" />}
          </Route>

          {!accessToken ? (
            <Route exact path="/login">
              <LoginRegisterForm setToken={setToken}></LoginRegisterForm>
            </Route>
          ) : (
            <Route exact path="/users" component={UsersList} />
          )}

          <Route exact path="/login">
            {!accessToken ? <Redirect to="/login" /> : <Redirect to="/users" />}
          </Route>

          <GuardedRoute
            path="/users"
            component={UsersList}
            auth={accessToken}
          />
          <GuardedRoute
            path="/edit/:id"
            component={AddEditUser}
            auth={accessToken}
          />
          <GuardedRoute
            path="/addUser"
            component={AddEditUser}
            auth={accessToken}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
