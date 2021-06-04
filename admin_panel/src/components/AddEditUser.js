import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//import CountrySelect from "react-bootstrap-country-select";
import { useParams, Link, useHistory  } from "react-router-dom";

function AddEditUser(props) {
  //const [country, setCountry] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [userData, setUserData] = useState({});
  const history = useHistory(); 
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setFirstName(data["first_name"]);
        setLastName(data["last_name"]);
        setEmail(data.email);
        setActive(data.active);
      });
    // .then(() => setCountry(userData.country));
  }, [id]);

  const updateUser = (e) => {
e.preventDefault();
    const data = userData;
    data["first_name"] = firstName;
    data["last_name"] = lastName;
    data.email = email;
    data.active = active;
    setUserData(data);
    async function editUser() {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userData)
      });
      return response.json();
    }
    editUser()
    .then(data => console.log(data))
    .then(() => history.push(`/`));
  };



  return (
    <Container style={{ marginTop: "100px" }}>
      <Form>
        <Row>
          <Col>
            <Form.Label>First name</Form.Label>
            <Form.Control
              value={firstName || ""}
              onChange={(ev) => {
                setFirstName(ev.target.value);
                console.log(firstName);
              }}
              placeholder="First name"
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              value={lastName || ""}
              onChange={(ev) => {
                setLastName(ev.target.value);
                console.log(lastName);
              }}
              placeholder="Last name"
            />
          </Col>
        </Row>
        <Form.Group controlId="formBasicEmail" className="mt-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email || ""}
            type="email"
            onChange={(ev) => {
              setEmail(ev.target.value);
              console.log(email);
            }}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Row>
          <Col>
            {/* <CountrySelect value={country} onChange={setCountry} /> */}
          </Col>
        </Row>
        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            onChange={(ev) => {
              setActive(ev.target.checked);
              console.log(active);
            }}
            label="Active"
          />
        </Form.Group>
        <Button onClick={(е)=>updateUser(е)}  variant="primary" type="submit">
          Submit
        </Button>{" "}
        <Link to={"/"}>
        <Button variant="secondary">
          Cancel
        </Button>
        </Link>
      </Form>
    </Container>
  );
}

export default AddEditUser;
