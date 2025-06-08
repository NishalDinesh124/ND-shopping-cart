import React from 'react';
import styled from 'styled-components';
import { GiShoppingCart } from "react-icons/gi";
import axios from 'axios';
import { addToCartRoute } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';



const FloatingCartButton = styled.button`
  position: absolute;
  opacity: 0;
  top: -20px;
  right: -20px;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.primary || '#10b981'};
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: opacity 1s ease;
  cursor: pointer;
  z-index: 10;
`;
const CardWrapper = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 16px;
  padding: 5rem 0rem 3rem;
background-color: #f0fdf4;
 box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06), 0 4px 8px rgba(16, 185, 129, 0.12);
  position: relative;
  overflow: visible;
  text-align: center;
  transition: transform 0.3s ease;
  width: 100%;
 
  min-width: 282px;
  margin: auto;

  &:hover ${FloatingCartButton} {
    opacity: 1;
    transform: translateY(-6px);
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  background: #fff;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${CardWrapper}:hover & img {
    transform: scale(1.1);
  }
`;

const Info = styled.div`
  margin-top: 60px;
`;

const Name = styled.h3`
  margin: 0.5rem 0 0;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.dark};
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
  margin: 0.25rem 0 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Button = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  color: #fff;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

 
  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark || '#0066cc'};
  }
`;


const ProductCard = ({ product}) => {
  const {user} = useAuth()
  const navigate = useNavigate();
  const addToCart = async () => {
    if(user){  
 const res = await axios.post(addToCartRoute, { product,user })
    if (res.data.status) {
      toast.info(res.data.msg)
    }
    }else{
      toast.info("Login first")
      navigate('/auth')
    }
  }

  return (
    <CardWrapper>
      <FloatingCartButton onClick={() => { addToCart() }}>
        <GiShoppingCart />
      </FloatingCartButton>
      <ImageWrapper>
        <img src={product.img} alt={product.name} />
      </ImageWrapper>
      <Info >
        <Name>{product.name}</Name>
        <Price>₹{product.price.toFixed(2)}</Price>
        <ButtonGroup>

          <Button to={'/place-order'} state={{product}}>Buy Now</Button>
          <Button to={'/view-product'} state={{product}}>View</Button>
        </ButtonGroup>
      </Info>
    </CardWrapper>
  );
};

export default ProductCard;
