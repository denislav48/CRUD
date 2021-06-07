import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function LoginRegisterForm(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [access, setAccess] = useState(false);

  const history = useHistory();

  const handleOnSubmit = (ev) => {
    ev.preventDefault();

    const userData = { email, password };
    // fetch("http://localhost:3001/users", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // 'Content-Type': 'application/x-www-form-urlencoded',
    //   },
    //   body: JSON.stringify(userData),
    // });

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userData),
    })
      .then((data) => data.json())
      .then((data) =>
        data.accessToken
          ? sessionStorage.setItem("accessToken", data.accessToken)
          : null
      )
      .then(() =>
        sessionStorage.getItem("accessToken") ? props.setToken(sessionStorage.getItem("accessToken")) : null
      )
      .then(() => history.push("/users"));
  };
  return (
    <Form>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button
        onClick={(ev) => handleOnSubmit(ev)}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default LoginRegisterForm;
