import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

/// === STYLED COMPONENTS === ///
const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
  font-family: Inter;
`;

const Container = styled.div`
  padding: 2rem;
  display: grid;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  text-align: center;

  h3 {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.dark};
  }

  p {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    margin-top: 0.5rem;
  }
`;

const AdminHome = () => {
  const navigate = useNavigate();
  useEffect(()=>{
   const admin = localStorage.getItem('cart-app-admin')
   if(!admin){                  /// checking admin login status
    navigate('/admin/login')
   }
  })
  return (
    <PageWrapper>
      <Container>
        
        <Card>
          <h3>Total Orders</h3>
          <p>152</p>
        </Card>
        <Card>
          <h3>Total Users</h3>
          <p>89</p>
        </Card>
        <Card>
          <h3>Revenue</h3>
          <p>$12,450</p>
        </Card>
      </Container>
    </PageWrapper>
  );
};

export default AdminHome;
