import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

/// === STYLED COMPONENTS === ///
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2.5rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 0.6s ease forwards;
  font-family: Inter, sans-serif;
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const OrderSuccessPage = () => {
  const navigate = useNavigate();
  /// GETTING STATE PASSED THROUGH API CALL ///
   const location = useLocation();
  const call = location.state?.placeordercall;
  useEffect(()=>{
    if(!call){
      navigate('/')
      return;
    }
  },[call,navigate])
  return (
    <SuccessContainer>
      <SuccessIcon />
      <Title>Order Placed Successfully!</Title>
      <Message>Thank you for your purchase. You will receive a confirmation email shortly.</Message>
      <HomeButton to="/">Continue Shopping</HomeButton>
    </SuccessContainer>
  );
};

export default OrderSuccessPage;
