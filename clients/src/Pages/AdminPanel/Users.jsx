import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteUserRoute, getAllUsersRoute } from "../../Utils/APIRoutes";

const Container = styled.div`
  font-family: Inter;
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;

  th, td {
    padding: 1rem;
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.primaryLight || "#f5f5f5"};
    color: ${({ theme }) => theme.colors.dark};
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: #e11d48;
  cursor: pointer;
  font-size: 1.1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(getAllUsersRoute) 
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users.");
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    try {
      await axios.post(deleteUserRoute,{userId}); 
      toast.success("User deleted");
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>All Users</Title>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date Joined</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user._id}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <DeleteBtn onClick={() => handleDelete(user._id)}>
                  <FaTrash />
                </DeleteBtn>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminUsersPage;
