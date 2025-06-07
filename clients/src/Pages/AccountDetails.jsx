import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleOutline } from 'react-icons/io5';

const Container = styled.div`
  font-family: Inter;
  padding: 2rem;
  max-width: 500px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  margin-top: 3rem;
  text-align: center;
`;

const Avatar = styled.div`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Heading = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const Info = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0.5rem 0;
`;

const LogoutButton = styled.button`
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: 0.6rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AccountDetails = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <Container><p>Please login to view your account.</p></Container>;
  }

  return (
    <Container>
      <Avatar>
        <IoPersonCircleOutline />
      </Avatar>
      <Heading>My Account</Heading>
      <Info><strong>Name:</strong> {user.username}</Info>
      <Info><strong>Email:</strong> {user.email}</Info>
      <Info><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</Info>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default AccountDetails;
