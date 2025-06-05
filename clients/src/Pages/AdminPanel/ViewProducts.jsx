import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'
import { getProductsRoute } from '../../Utils/APIRoutes';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  font-family: Inter;
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 3rem;
  overflow-x: auto;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
`;

const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary || '#20ac66'};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || '#178a4f'};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: ${({ theme }) => theme.colors.bg || '#f7f7f7'};
    color: ${({ theme }) => theme.colors.dark};
  }

  tr:hover {
    background-color: #f9f9f9;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ViewProductsPage = () => {
  const navigate = useNavigate();
  //==STATES==//
  const [products, setProducts] = useState([])

  useEffect(() => {
    const admin = localStorage.getItem('cart-app-admin')
    if (!admin) {
      navigate('/admin/login')
    }
  })

  const handleAddProduct = () => {
    navigate('/admin/add-products')
  };

  /// === Getting products from backend ===///
  const getProducts = async () => {
    const res = await axios.get(getProductsRoute)
    setProducts(res.data)

  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <Wrapper>
      {/* Sidebar component here if applicable */}
      <MainContent>
        <TitleWrapper>
          <Title>All Products</Title>
          <AddButton onClick={handleAddProduct}>+ Add New Product</AddButton>
        </TitleWrapper>

        <Table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td><img src={prod.img} alt={prod.name} /></td>
                <td>{prod._id}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </MainContent>
    </Wrapper>
  );
};

export default ViewProductsPage;
