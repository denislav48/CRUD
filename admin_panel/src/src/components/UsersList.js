/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
//import usersData from "../mock_data.json";
import UsersPagination from "./UsersPagination";
import { Link } from "react-router-dom";
import { FcAlphabeticalSortingAz } from "react-icons/fc";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isAscending, setIsAscending] = useState(false);
  const [usersPages, setUsersPages] = useState();
  const [page, setPage] = useState(1);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const notifyDelete = () => toast("User Deleted!");
 


  function onPageChange(page) {
    setPage(page);
    console.log(page, 'tazi');
  }

  if (usersPages === users.length / 8 && page > usersPages) {
    onPageChange(page - 1);
  }

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    // .then(() => props.changeId(users[users.length - 1].id + 1));
    // setUsers(usersData);
  }, []);

  useEffect(() => {
    let usersPages = Math.ceil(users.length / 8);
    if (users.length) {
      setUsersPages(usersPages);
    }
  }, [users]);

  const deleteUser = () => {
    const newArrayUsers = users.filter((user) => user.id !== selectedId);
    setUsers(newArrayUsers);
    async function deleteID(id) {
       await fetch(`http://localhost:3001/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      // Awaiting for the resource to be deleted
      const resData = "resource deleted...";

      // Return response data
      return resData;
    }
    deleteID(selectedId)
      .then((response) => notifyDelete())
      .catch((err) => console.log(err));
    handleClose();
  };

  const searchByFirstName = (name) => {
    async function searchName() {
      await fetch(`http://localhost:3001/users?first_name_like=${name}`)
        .then((res) => res.json())
        .then((data) => setUsers(data));
    }
    searchName();
  };

  const sortByFirstName = () => {
    async function sort() {
      if (!isAscending) {
        await fetch(`http://localhost:3001/users?_sort=first_name&_order=asc`)
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .then(() => setIsAscending(true));
      } else {
        await fetch(`http://localhost:3001/users?_sort=first_name&_order=desc`)
          .then((res) => res.json())
          .then((data) => setUsers(data))
          .then(() => setIsAscending(false));
      }
    }
    sort();
  };
  
  return (
    <Container style={{ marginTop: "10px" }}>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteUser()}>
            Delete
            <ToastContainer />
          </Button>
        </Modal.Footer>
      </Modal>

      <Form>
        <Row>
          <Col>
            <Link to="/addUser">
              <Button variant="secondary" style={{ float: "right" }}>
                Add User
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className="mt-3 mb-3">
          <Col>
            <Form.Control
              onChange={(ev) => {
                searchByFirstName(ev.target.value);
              }}
              placeholder="Search by frst name"
            />
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>
              First Name{" "}
              <FcAlphabeticalSortingAz onClick={() => sortByFirstName()} />{" "}
            </th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Employee Mobile</th>
            <th>Active</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            if (page === 1 && index < 8) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user["first_name"]}</td>
                  <td>{user["last_name"]}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Form.Check
                      disabled
                      type="radio"
                      label="disabled radio"
                      id="disabled-default-radio"
                    />
                  </td>
                  <td>
                    <Link to={`/edit/${user.id}`}>
                      <Button>Edit</Button>{" "}
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShow(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            } else if (
              index >= (page - 1) * 8 &&
              index < page * 8
            ) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user["first_name"]}</td>
                  <td>{user["last_name"]}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Form.Check
                      disabled
                      type="radio"
                      label="disabled radio"
                      id="disabled-default-radio"
                    />
                  </td>
                  <td>
                    <Link to={`/edit/${user.id}`}>
                      <Button>Edit</Button>{" "}
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleShow(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </Table>
      <UsersPagination
        change={onPageChange}
        page={page}
        pages={usersPages}
      />
    </Container>
  );
}

export default UsersList;
