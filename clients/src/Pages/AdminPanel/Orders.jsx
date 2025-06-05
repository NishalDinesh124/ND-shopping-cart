import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getOrdersRoute } from '../../Utils/APIRoutes';

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  font-family: 'Inter', sans-serif;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 1.5rem;
`;

const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const InfoBlock = styled.div`
  margin: 0.4rem 0;
`;

const Label = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

const Value = styled.span`
  margin-left: 0.4rem;
  color: ${({ theme }) => theme.colors.secondary};
`;

const ProductsList = styled.ul`
  padding-left: 1.2rem;
  margin-top: 1rem;
`;

const ProductItem = styled.li`
  margin-bottom: 0.5rem;
`;

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(getOrdersRoute);
      setOrders(res.data);
    } catch (err) {
      toast.error('Failed to load orders!');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <PageWrapper>
      <Title>All Orders</Title>
      {orders.map((order) => (
        <OrderCard key={order._id}>
          <OrderHeader>
            <InfoBlock>
              <Label>Order ID:</Label>
              <Value>{order._id}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>Status:</Label>
              <Value>{order.status}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>Payment:</Label>
              <Value>{order.paymentMethod.toUpperCase()}</Value>
            </InfoBlock>
            <InfoBlock>
              <Label>Date:</Label>
              <Value>{new Date(order.orderedAt).toLocaleString()}</Value>
            </InfoBlock>
          </OrderHeader>

          <InfoBlock>
            <Label>Customer:</Label>
            <Value>{order.address?.username} ({order.address?.email})</Value>
          </InfoBlock>

          <InfoBlock>
            <Label>Phone:</Label>
            <Value>{order.address?.phone}</Value>
          </InfoBlock>

          <InfoBlock>
            <Label>Address:</Label>
            <Value>
              {order.address?.address}, {order.address?.city}, {order.address?.state} - {order.address?.zip}, {order.address?.country}
            </Value>
          </InfoBlock>

          <InfoBlock>
            <Label>Products:</Label>
            <ProductsList>
              {order.products.map((product, index) => (
                <ProductItem key={index}>
                  {product.name} — ₹{product.price} × {product.quantity || 1}
                </ProductItem>
              ))}
            </ProductsList>
          </InfoBlock>
        </OrderCard>
      ))}
    </PageWrapper>
  );
};

export default AdminOrdersPage;
