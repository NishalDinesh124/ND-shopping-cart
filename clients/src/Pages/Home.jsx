import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
import { getItemsRoute } from '../Utils/APIRoutes';
import { useAuth } from '../Context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  font-family: Inter;
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  max-height: 100vh;
  overflow: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 6rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary : theme.colors.lightGray};
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.dark};
  border: none;
  border-radius: 20px;
  padding: 0.5rem 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  overflow: auto;
  max-height: 500px;
  padding: 5em 3em;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;
`;

const Home = () => {
  const { search, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getItems = async () => {
    const res = await axios.get(getItemsRoute);
    setProducts(res.data.items);
  };

  useEffect(() => {
    getItems();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <Wrapper>
      <MainContent>
        <Title></Title>

        {/* CATEGORY FILTER */}
        <FilterContainer>
          {['all', 'Laptops', 'Mobile Phones', 'Smartwatches'].map((category) => (
            <FilterButton
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'all'
                ? 'All'
                : category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>

        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} user={user} />
          ))}
        </ProductGrid>
      </MainContent>
    </Wrapper>
  );
};

export default Home;
