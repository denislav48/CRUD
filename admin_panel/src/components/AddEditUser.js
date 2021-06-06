import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
//import CountrySelect from "react-bootstrap-country-select";
import { useParams, Link, useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./AddEditUser.css";

function AddEditUser(props) {
  //const [country, setCountry] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [active, setActive] = useState("");
  const [userData, setUserData] = useState({});
  const history = useHistory();
  const { id } = useParams();
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [street, setStreet] = useState("");
  const [postal, setPostal] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  function selectCountry(val) {
    setCountry(val);
  }

  function selectRegion(val) {
    setRegion(val);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/users/${id || ''}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setFirstName(data["first_name"]);
        setLastName(data["last_name"]);
        setEmail(data.email);
        setActive(data.active);
        setCountry(data.country);
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
    data.country = country;
    setUserData(data);
    async function editUser() {
      const response = await fetch(`http://localhost:3001/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(userData),
      });
      return response.json();
    }
    editUser()
      .then((data) => console.log(data))
      .then(() => history.push(`/`));
  };

  const addUser = (e) => {
    e.preventDefault();
    const data = {};
    //data.id = props.lastId;
    data["first_name"] = firstName;
    data["last_name"] = lastName;
    data.email = email;
    data.password = password;
    data.active = active;
    data.phone = phone;
    data["date_of_birth"] = birthDate;
    data.country = country;
    data.city = region;
    data["street_address"] = street;
    data["postal_code"] = postal;
    setUserData(data);
    async function add() {
      const response = await fetch(
        `http://localhost:3001/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data),
        }
      );
      return response.json();
    }
    add()
      .then((data) => console.log(data))
      .then(() => history.push(`/`));
  };

  return (
    <Container className="containerStyle">
      <div className="generalInfo">
        <div>
          {id ? (
            <div>
              <h2>{firstName}</h2>
              <h4>{email}</h4>
            </div>
          ) : (
            <h3>Add new user</h3>
          )}
        </div>
      </div>
      <Form>
        {id ? (
          <Row className="avatar">
            <Col>
              <Image
                style={{ backgroundColor: "black" }}
                src={userData.avatar}
                roundedCircle
              />
            </Col>
          </Row>
        ) : null}
        <Row className="mt-4">
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
        <Form.Group controlId="formBasicEmail" className="mt-3 mb-3">
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
        </Form.Group>
        {!id ? (
          <>
            <Row>
              <Col>
                <Form.Label>Birth date</Form.Label>
                <Form.Control
                  onChange={(ev) => setBirthDate(ev.target.value)}
                  type="date"
                  placeholder="Birth date"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Form.Label>Str. address</Form.Label>
                <Form.Control
                  onChange={(ev) => setStreet(ev.target.value)}
                  type="text"
                  placeholder="Address"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col sm="5">
                <Form.Label>Country/City</Form.Label>
                <br />
                <CountryDropdown
                  className="country"
                  value={country}
                  onChange={(val) => selectCountry(val)}
                />
                <RegionDropdown
                  className="country"
                  country={country}
                  value={region}
                  onChange={(val) => selectRegion(val)}
                />
              </Col>
              <Col sm="2">
                <Form.Label className="postal">Post code</Form.Label>
                <Form.Control
                  onChange={(ev) => setPostal(ev.target.value)}
                  type="text"
                  pattern="[0-9]*"
                ></Form.Control>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm="5">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={(ev) => setPassword(ev.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col>
              <label>Country</label>
              <br />
              <CountryDropdown
                value={country}
                onChange={(val) => selectCountry(val)}
              />
            </Col>
          </Row>
        )}
        {/* <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group> */}
        <Form.Group controlId="formBasicCheckbox" className="mt-2">
          <Form.Check
            type="checkbox"
            onChange={(ev) => {
              setActive(ev.target.checked);
              console.log(active);
            }}
            label="Active"
          />
        </Form.Group>
        {id ? (
          <Button
            onClick={(е) => updateUser(е)}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        ) : (
          <Button onClick={(е) => addUser(е)} variant="primary" type="submit">
            Submit
          </Button>
        )}
        <Link to={"/"}>
          {"  "}
          <Button variant="secondary">Cancel</Button>
        </Link>
      </Form>
    </Container>
  );
}

export default AddEditUser;
