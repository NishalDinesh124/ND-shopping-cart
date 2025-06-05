import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../Components/ProductCard';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import { getItemsRoute } from '../Utils/APIRoutes';
import { useAuth } from '../Context/AuthContext';

const Wrapper = styled.div`
  display: flex;
  font-family: Inter;
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
`;
const ToggleButton = styled.button`
  position: fixed;
  top: 5rem;
  left: 1rem;
  z-index: 1000;
  background-color: ${({ theme }) => theme.colors.primary || '#333'};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 0.75rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, background-color 0.3s;

  &:hover {
    transform: scale(1.1);
    background-color: ${({ theme }) => theme.colors.primaryHover || '#20ac66'};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  padding: 2rem 1.5rem;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  font-family: Inter;
  transition: left 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${({ open }) => (open ? '0' : '-100%')};
    height: 100%;
    z-index: 998;
    box-shadow: 8px 0 24px rgba(0, 0, 0, 0.1);
  }
`;

const SidebarCloseButton = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #f5f5f5;
    border: none;
    font-size: 1.5rem;
    color: #333;
    padding: 0.3rem 0.6rem;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s;

    &:hover {
      background-color: #e2e2e2;
    }
  }
`;


const SearchBar = styled.input`
  padding: 0.75rem 1rem;
  border: solid 2px  ${({ theme }) => theme.colors.primaryHover || '#20ac66'};
  border-radius: 21px;
  font-size: 1rem;
  margin-bottom: 2rem;
  outline: none;
`;

const Category = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.dark};
  padding: 0.25rem 0;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;


const SubcategoryList = styled.ul`
  list-style: none;
  padding: 0.5rem 0 0 1rem;
  margin: 0;
`;

const Subcategory = styled.li`
  margin-bottom: 0.5rem;
  cursor: pointer;
  color: #333;
  font-size: 0.95rem;

  &:hover {
    text-decoration: underline;
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem 3em;
  max-height: 100vh;
    overflow: auto;
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 5rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 4rem;
  margin-bottom: 4rem;
`;

const Home = () => {
 const {search,user} = useAuth();
  ///=== STATES ===///
  
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({
    Laptops: false,
    'Mobile Phones': false,
    Smartwatches: false,
  });

  const toggleCategory = (cat) => {
    setExpanded((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };
/// === Getting products from database
const getItems = async()=>{
  const res = await axios.get(getItemsRoute)
  setProducts(res.data.items)
} 
  useEffect(()=>{
getItems();
  },[])

  return (
    <Wrapper>
     {!isSidebarOpen && (
  <ToggleButton onClick={() => setSidebarOpen(true)}>
    ☰
  </ToggleButton>
)}
      <Sidebar open={isSidebarOpen}>
         <SidebarCloseButton onClick={() => setSidebarOpen(false)}>✖</SidebarCloseButton>
        <SearchBar
          type="text"
          placeholder="Search products..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
        />

        {['Laptops', 'Mobile Phones', 'Smartwatches'].map((category) => (
          <Category key={category}>
            <CategoryTitle onClick={() =>{toggleCategory(category);if (window.innerWidth <= 768) setSidebarOpen(false);} }>
            {category}
              {expanded[category] ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryTitle>
            {expanded[category] && (
              <SubcategoryList>
                <Subcategory>{category} A</Subcategory>
                <Subcategory>{category} B</Subcategory>
              </SubcategoryList>
            )}
          </Category>
        ))}
      </Sidebar>

      <MainContent>
        <Title>Featured Products</Title>
        <ProductGrid>
          {products
            .filter((p) =>
              p.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <ProductCard key={product._id} product={product} user={user}/>
            ))}
        </ProductGrid>

        {/* <Title>Mobile Phones</Title>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id + '_mob'} product={product} />
          ))}
        </ProductGrid>

        <Title>Laptops</Title>
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id + '_lap'} product={product} />
          ))}
        </ProductGrid> */}
      </MainContent>
    </Wrapper>
  );
};

export default Home;
