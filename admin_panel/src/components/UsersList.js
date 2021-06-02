/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Table, Container, Button, Modal } from "react-bootstrap";
import usersData from "../mock_data.json";
import UsersPagination from "./UsersPagination";

function UsersList(props) {
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  let usersPages = Math.ceil(users.length / 10);

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const deleteUser = () => {
    const newArrayUsers = users.filter((user) => user.id !== deleteId);
    setUsers(newArrayUsers);
    handleClose();
  };

  return (
    <Container style={{ marginTop: "100px" }}>
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
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="secondary" style={{ float: "right", margin: "20px" }}>
        Add User
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Employee Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            if (props.page === 1 && index < 10) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user["first_name"]}</td>
                  <td>{user["last_name"]}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button>Edit</Button>{" "}
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
              index >= (props.page - 1) * 10 &&
              index < props.page * 10
            ) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user["first_name"]}</td>
                  <td>{user["last_name"]}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Button>Edit</Button>{" "}
                    <Button variant="danger"  onClick={() => handleShow(user.id)}>
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
        change={props.change}
        page={props.page}
        pages={usersPages}
      />
    </Container>
  );
}

export default UsersList;
