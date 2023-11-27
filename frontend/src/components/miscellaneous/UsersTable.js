import * as React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Switch } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function UsersTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('/api/admin/getUsers')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const toggleSuspendUser = (id, isSuspended) => {
    // Toggle suspend status of user
    axios.post(`/api/admin/${id}/suspendUser`, { isSuspend: !isSuspended })
      .then(response => {
        // Update user list
        setUsers(users.map(user => user._id === id ? response.data : user));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>User Name</Th>
          <Th>Email</Th>
          <Th>Suspended</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user)=> (
          <Tr key={user._id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <Switch colorScheme="red" isChecked={user.isSuspend} onChange={() => toggleSuspendUser(user._id, user.isSuspend)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default UsersTable;