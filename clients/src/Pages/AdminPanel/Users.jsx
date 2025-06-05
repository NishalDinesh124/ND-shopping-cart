import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteUserRoute, getAllUsersRoute } from "../../Utils/APIRoutes";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  font-family: Inter;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 2rem;
  text-align: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;

const UserCard = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.lightGray};
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.01);
  }
`;

const Info = styled.div`
  margin-bottom: 0.8rem;
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

const Value = styled.span`
  margin-left: 0.4rem;
  color: ${({ theme }) => theme.colors.gray};
`;

const DeleteBtn = styled.button`
  background: none;
  border: none;
  color: #e11d48;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(getAllUsersRoute);
      setUsers(res.data);
    } catch (err) {
      toast.error("Failed to load users.");
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;
    try {
      await axios.post(deleteUserRoute, { userId });
      toast.success("User deleted");
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    const admin = localStorage.getItem("cart-app-admin");
    if (!admin) {
      navigate("/admin/login");
      return;
    }
    fetchUsers();
  }, [navigate]);

  return (
    <Container>
      <Title>All Users</Title>
      <CardGrid>
        {users.map((user, idx) => (
          <UserCard key={user._id}>
            <Info><Label>#</Label><Value>{idx + 1}</Value></Info>
            <Info><Label>Name:</Label><Value>{user.username}</Value></Info>
            <Info><Label>Email:</Label><Value>{user.email}</Value></Info>
            <Info><Label>Role:</Label><Value>{user.role}</Value></Info>
            <Info><Label>Date Joined:</Label><Value>{new Date(user.createdAt).toLocaleDateString()}</Value></Info>
            <DeleteBtn onClick={() => handleDelete(user._id)}><FaTrash /> Delete</DeleteBtn>
          </UserCard>
        ))}
      </CardGrid>
    </Container>
  );
};

export default AdminUsersPage;
