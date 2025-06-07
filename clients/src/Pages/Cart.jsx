import React, { useEffect} from 'react';
import styled from 'styled-components';
import { FaTrashAlt } from 'react-icons/fa';
import { GiShoppingCart } from "react-icons/gi";
import axios from 'axios';
import { deleteCartRoute,updateCartRoute } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { useAuth } from '../Context/AuthContext';
import {debounce } from'lodash'
import { Link, useNavigate } from 'react-router-dom';


/// === Styled components === ///
const EmptyContainer = styled.div`
font-family: Inter;
  text-align: center;
  padding: 3rem 2rem;
  border-radius: 1rem;
  background-color: #f8f9fa;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  font-family: Inter;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

const EmptyText = styled.h3`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const SubText = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
`;

const ShopButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;


const CartContainer = styled.div`
  max-width: 1100px;
  font-family: Inter;
  margin: 3rem auto;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const CartTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.8rem;
  font-weight: bold;
`;

const CartItems = styled.div`
  overflow: auto;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.05);
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};
`;

const ItemPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    padding: 0.3rem 0.6rem;
    background-color: #eee;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #ddd;
    }
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e11d48;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
`;

const Subtotal = styled.h3`
  color: ${({ theme }) => theme.colors.dark};
  font-size: 1.2rem;
`;

const CheckoutButton = styled(Link)`
text-decoration: none;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 0.75rem 1.5rem;
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const CartPage = () => {
  const {user, getCartItems, cartItems, setCartItems, total} = useAuth();
  const navigate = useNavigate(); 
  




  useEffect(() => {
  const user = localStorage.getItem('cart-app-user')
  if(!user){
    navigate('/auth')
  }else{
getCartItems();
  }
    
  }, [navigate]);
/// === Deleting cart items function === ///

const deleteCartItem = async(itemId)=>{
  const res = await axios.post(deleteCartRoute,{itemId, user: user._id})
  if(res.data.status)
    getCartItems();
    toast.info(res.data.msg)
}
// === Updating quantity functions === ///
  const updateQuantity = 
    debounce(async (itemId, newQty) => {
      try {
        const res = await axios.post(updateCartRoute, {
          itemId,
          userId: user._id,
          newQuantity: newQty,
        });
        if(res.data.status)
          toast.info(res.data.msg)
        getCartItems();
      } catch (err) {
        toast.error("An error occurred while updating cart");
      }
    }, 900)

  const incrementQty = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
    const updatedQty = cartItems.find(i => i._id === itemId)?.quantity + 1 ;
    updateQuantity(itemId ,updatedQty);
  };

  const decrementQty = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    const updatedQty = cartItems.find(i => i._id === itemId)?.quantity - 1;
    updateQuantity(itemId, updatedQty);
  };
  

  
if (cartItems.length === 0) {
  return (
    <CartContainer>
      <EmptyContainer>
        <EmptyIcon>
          <GiShoppingCart/>
        </EmptyIcon>
        <EmptyText>Your Cart is Empty</EmptyText>
        <SubText>Looks like you haven’t added anything yet.</SubText>
        <ShopButton onClick={() => navigate('/')}>Continue Shopping</ShopButton>
      </EmptyContainer>
    </CartContainer>
  );
}else{
  return (
    <CartContainer>
      <CartTitle>Your Cart</CartTitle>
      <CartItems>
        {cartItems.map((item) => (
          <CartItem key={item._id}>
            <ItemInfo>
              <ItemImage src={item.img} alt={item.name} />
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>₹{(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </ItemDetails>
            </ItemInfo>

            <QuantityControls>
              <button onClick={() => decrementQty(item._id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => incrementQty(item._id)}>+</button>
            </QuantityControls>

            <RemoveButton title="Remove from Cart">
              <FaTrashAlt onClick={()=>{deleteCartItem(item._id)}}/>
            </RemoveButton>
          </CartItem>
        ))}
      </CartItems>

      <CartSummary>
        <Subtotal>Subtotal: ₹{total.toFixed(2)}</Subtotal>
        <CheckoutButton to={'/place-order'}>Place Order</CheckoutButton>
      </CartSummary>
    </CartContainer>
  );
}


};

export default CartPage;
