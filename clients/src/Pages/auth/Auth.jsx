import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../Context/AuthContext'
import { loginRoute, registerRoute } from '../../Utils/APIRoutes';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const AuthWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.bg};
  font-family: 'Inter', sans-serif;
  padding: 2rem;
`;

const AuthCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 0rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.9rem;
  font-size: 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textLight};
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const ToggleText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.dark};

  span {
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
    font-weight: 500;
  }
`;

const AuthPage = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) { /// Here login works
      const res = await axios.post(loginRoute, { formData })
      login(res.data.userfilter)
      if (res.data.status) {
        setFormData({
          username: '',
          email: '',
          password: ''
        })
        toast.success("Login succesfull")
        navigate('/')
      }else{
        console.log(res);
        toast.error(res.data.msg)
      }

    } else { /// Here registration works
      const res = await axios.post(registerRoute, { formData })
      login(res.data.userfilter)
      if (res.data.status) {
        setFormData({
          username: '',
          email: '',
          password: ''
        })
        toast.success("Registration succesfull")
        navigate('/')
      }else{
        toast.error(res.data.msg);
      }

    }



  }


  return (
    <AuthWrapper>
      <AuthCard>
        <Title>{isLogin ? 'Welcome Back' : 'Create an Account'}</Title>
        {!isLogin && <Input name='username' value={formData.username} onChange={handleChange} type="text" placeholder="Full Name" />}
        <Input name="email"
          value={formData.email}
          onChange={handleChange} type="email" placeholder="Email" />
        <Input name="password"
          value={formData.password}
          onChange={handleChange} type="password" placeholder="Password" />
        <Button onClick={handleSubmit}>{isLogin ? 'Login' : 'Register'}</Button>
        <ToggleText>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span onClick={() => setIsLogin((prev) => !prev)}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </ToggleText>
      </AuthCard>
    </AuthWrapper>
  );
};

export default AuthPage;
