import * as React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Switch } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import axios from 'axios';

function PostsTable() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    axios.get('/api/admin/getPosts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const toggleSuspendPost = (id, isSuspended) => {
    // Toggle suspend status of user
    axios.post(`/api/admin/${id}/suspendPost`, { isSuspend: !isSuspended })
      .then(response => {
        // Update post list
        setPosts(posts.map(post => post._id === id ? response.data : post));
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
          <Th>Description</Th>
          <Th>Suspended</Th>
        </Tr>
      </Thead>
      <Tbody>
        {posts.map((post) => (
          <Tr key={post._id}>
            <Td>{post.name}</Td>
            <Td>{post.description}</Td>
            <Td>
              <Switch colorScheme="red" isChecked={post.isSuspend} onChange={() => toggleSuspendPost(post._id, post.isSuspend)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

export default PostsTable;