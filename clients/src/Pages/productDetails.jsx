import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate} from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { addToCartRoute } from '../Utils/APIRoutes';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

const Container = styled.div`
  max-width: 1100px;
  margin: 4rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0px 10px 30px #10b9814a;
  display: flex;
  flex-direction: column;
  font-family: Inter;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageGallery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  img {
    width: 67%;
    border-radius: 12px;
    object-fit: cover;
    max-height: 400px;
  }

  .thumbnail-row {
    display: flex;
    gap: 0.5rem;

    img {
      max-height: 80px;
      cursor: pointer;
      transition: 0.3s ease;
      border: 2px solid transparent;

      &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Price = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: gold;
  }

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    background: ${({ theme }) => theme.colors.gray};
  }
`;

const ProductDetailPage = () => {
    const {user} = useAuth();
    const {state} = useLocation();
  const navigate = useNavigate();

  const product = state.product

  const handleAddToCart =async () => {  
    if(user){  
 const res = await axios.post(addToCartRoute, { product,user })
    if (res.data.status) {
      toast.info(res.data.msg)
    }
    }else{
      toast.info("Login first")
      navigate('/auth')
    }

  };

  const handleBuyNow = () => {
    toast.info("Redirecting to checkout")
    setTimeout(() => {
      navigate('/place-order',{state:{product}}); // or /checkout
    }, 1200);
  };

  return (
    <Container>
      <TopSection>
        <ImageGallery>
          <img src={product.img} alt={product.name} />
          {/* <div className="thumbnail-row">
            {product.images.map((img, idx) => (
              <img key={idx} src={img} alt={`Thumb ${idx}`} />
            ))}
          </div> */}
        </ImageGallery>

        <Details>
          <Title>{product.name}</Title>
          <Price>₹{product.price.toFixed(2)}</Price>
          <Description>{product.desc}</Description>
          <Rating>
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} style={{ opacity: i < Math.round(4.4) ? 1 : 0.3 }} />
            ))}
            <span>{4.4} / 5</span>
          </Rating>

          <ButtonRow>
            <PrimaryButton onClick={handleAddToCart}>Add to Cart</PrimaryButton>
            <SecondaryButton onClick={handleBuyNow}>Buy Now</SecondaryButton>
            <SecondaryButton onClick={() => navigate('/')}>Continue Shopping</SecondaryButton>
          </ButtonRow>
        </Details>
      </TopSection>
    </Container>
  );
};

export default ProductDetailPage;
