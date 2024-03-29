import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function LoginRegisterForm(props) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
 
  const history = useHistory();

  const notifyLoged = () => toast("User loged in!");

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
        sessionStorage.getItem("accessToken")
          ? props.setToken(sessionStorage.getItem("accessToken"))
          : null
      )
      .then(() => notifyLoged())
      .then((data) => {
        return new Promise((resolve) => setTimeout(() => resolve(data), 1500));
      })
      
      .then(() => history.push("/users"));
  };
  return (
    <Container style={{ width: "50%" }}>
      <ToastContainer />
      <Row className="mt-5 mb-3">
        <Col>
          <h2>Admin login</h2>
        </Col>
      </Row>
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

        <Button
          onClick={(ev) => handleOnSubmit(ev)}
          variant="primary"
          type="submit"
        >
          Login
        </Button>
      </Form>
    </Container>
  );
}

export default LoginRegisterForm;
