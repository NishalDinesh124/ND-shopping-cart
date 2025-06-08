import React, { useEffect, useState, Suspense, lazy } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { getItemsRoute } from '../Utils/APIRoutes';
import { useAuth } from '../Context/AuthContext';

// Lazy load ProductCard
const ProductCard = lazy(() => import('../Components/ProductCard'));

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.lightGray};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
  margin: 5rem auto;
`;

const Wrapper = styled.div`
  display: flex;
  font-family: Inter;
  background: ${({ theme }) => theme.colors.white};
`;

const MainContent = styled.main`
  flex: 1;
  max-height: 100%;
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
  max-height: 56vh;
  padding: 5em 3em;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;
`;

const Home = () => {
  const { search, user } = useAuth();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  const getItems = async () => {
    try {
      const res = await axios.get(getItemsRoute);
      setProducts(res.data.items);
    } catch (err) {
      console.error("Error fetching products", err);
    } finally {
      setLoading(false);
    }
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
        <Title>Our Products</Title>

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

        {loading ? (
          <Spinner />
        ) : (
          <Suspense fallback={<Spinner />}>
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} user={user} />
              ))}
            </ProductGrid>
          </Suspense>
        )}
      </MainContent>
    </Wrapper>
  );
};

export default Home;
