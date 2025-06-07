import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../Context/AuthContext';
import { paymentRoute, placeOrderRoute } from '../Utils/APIRoutes';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Wrapper = styled.div`
  display: flex;
  overflow: auto;
  max-height: 100vh;
  flex-direction: column;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.white};
  font-family: Inter;
  padding: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    padding: 3rem 5rem;
  }
`;

const FormSection = styled.div`
  flex: 2;
  height: 43em;
  overflow: auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`;

const OrderSummary = styled.div`
  flex: 1;
  height: 460px;
  background: #10b98136;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.05);
  margin-top: 2rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SummaryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 1rem;
`;
const ItemBox = styled.div`
display: flex;
padding:1em;
flex-direction: column;
max-height: 225px;
overflow: auto;
`

const Total = styled(SummaryItem)`
  font-weight: bold;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const PlaceOrderButton = styled.button`
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.9rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const PlaceOrder = () => {
  const { getCartItems, cartItems, total, user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const location = useLocation();
  const buyNowProduct = location.state?.product;
  const isBuyNow = !!buyNowProduct;  //// If the call is from buy now button show only that particular product else show all cart items


  useEffect(() => {
    const user = localStorage.getItem('cart-app-user');
    if (!user) {
      toast.info('You need to login to buy products');
      navigate('/auth');
    } else {
      getCartItems(); // Fetch first
    }
  }, [navigate]);


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });  /// Address data storing

  /// Handling input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  /// === Razorpay function ===///

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const loadRazorpay = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const orderRes = await axios.post(paymentRoute, { amount });
    const { id: order_id, currency } = orderRes.data;

    const options = {
      key: "rzp_test_h8KeIrbipUT13H",
      amount: amount * 100,
      currency,
      name: "ND Cart",
      description: "Order Payment",
      order_id,
      handler: async function (response) {
        // ✅ Razorpay Payment Success

        const orderData = {
          userId: user._id,
          address: formData,
          paymentMethod: "online",
          paymentId: response.razorpay_payment_id,
          products: isBuyNow ? [buyNowProduct] : cartItems,
        };

        try {
          const placeRes = await axios.post(placeOrderRoute, { orderData });
          if (placeRes.data.status) {
            const placeordercall = true;
            navigate('/order-success', { state: { placeordercall } });
          }
        } catch (err) {
          console.error("Error placing order after Razorpay success:", err);
          toast.error("Order failed to be saved.");
        }
      },
      prefill: {
        name: "Nishal Dinesh",
        email: "test@example.com",
      },
      theme: {
        color: "#10B981",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // === Handling order placing ===///

  const handlePlaceOrder = async () => {
    const fields = Object.entries(formData); // ensuring all fields are filled

    for (let [key, value] of fields) {
      if (!value.trim()) {
        toast.warning(`Please fill in ${key}`);
        return;
      }
    }

    const orderData = {
      userId: user._id,
      address: formData,
      paymentMethod: paymentMethod,
      products: isBuyNow ? [buyNowProduct] : cartItems,
    };

    if (paymentMethod === 'cod') {
      try {
        const res = await axios.post(placeOrderRoute, { orderData, isBuyNow });
        if (res.data.status) {
          const placeordercall = true
          navigate('/order-success', { state: { placeordercall } })
        }
      } catch (err) {
        console.log("An error occured while placing order", err);

      }

    } else {
      try {
        if (isBuyNow) {
          loadRazorpay(buyNowProduct.price) // Only take that product price if buy now is clicked
        } else {
          loadRazorpay(total) // take total cart price
        }

      } catch (err) {
        console.log("An error occured with payment");

      }


    }

  };

  return (
    <Wrapper>
      <FormSection>
        <Title>Shipping Information</Title>
        <Form>
          <InputGroup>
            <Label>Full Name</Label>
            <Input name='username' value={formData.username} onChange={handleChange} type="text" placeholder="John Doe" required />
          </InputGroup>

          <InputGroup>
            <Label>Email Address</Label>
            <Input name='email' value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" required />
          </InputGroup>

          <InputGroup>
            <Label>Phone Number</Label>
            <Input name='phone' value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 98765 43210" required />
          </InputGroup>

          <InputGroup>
            <Label>Street Address</Label>
            <Input name='address' value={formData.address} onChange={handleChange} type="text" placeholder="123 Main Street" required />
          </InputGroup>

          <InputGroup>
            <Label>City</Label>
            <Input name='city' value={formData.city} onChange={handleChange} type="text" placeholder="City Name" required />
          </InputGroup>

          <InputGroup>
            <Label>State</Label>
            <Input name='state' value={formData.state} onChange={handleChange} type="text" placeholder="State Name" required />
          </InputGroup>

          <InputGroup>
            <Label>ZIP Code</Label>
            <Input name='zip' value={formData.zip} onChange={handleChange} type="text" placeholder="123456" required />
          </InputGroup>

          <InputGroup>
            <Label>Country</Label>
            <Input name='country' value={formData.country} onChange={handleChange} type="text" placeholder="India" required />
          </InputGroup>

          <InputGroup>
            <Label>Payment Method</Label>
            <RadioGroup>
              <RadioOption>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                Cash on Delivery
              </RadioOption>

              <RadioOption>
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                />
                Online Payment
              </RadioOption>
            </RadioGroup>
          </InputGroup>
        </Form>
      </FormSection>

      <OrderSummary>

        <SummaryTitle>Order Summary</SummaryTitle>
        {/* If the call is form buy now button show only that particular product else show all cart items */}
        <ItemBox>{isBuyNow ? (<SummaryItem key={buyNowProduct._id}>
          <span>{buyNowProduct.name}</span>
          <span>₹{buyNowProduct.price}</span>
        </SummaryItem>) : (cartItems.map((item) => (

          <SummaryItem key={item._id}>
            <span>{item.name}</span>
            <span>₹{item.price} x {item.quantity}</span>
          </SummaryItem>


        )))}
          <SummaryItem>
            <span>Shipping</span>
            <span>Free</span>
          </SummaryItem>
        </ItemBox>

        {isBuyNow ? <Total>
          <span>Total: </span>
          <span>₹{buyNowProduct.price}</span>
        </Total> : <Total>
          <span>Total: </span>
          <span>₹{total}</span>
        </Total>}


        <PlaceOrderButton onClick={handlePlaceOrder}>Place Order</PlaceOrderButton>
      </OrderSummary>
    </Wrapper>
  );
};

export default PlaceOrder;
