import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { adminLoginRoute, adminRegisterRoute } from '../../Utils/APIRoutes';
import { toast } from 'react-toastify';
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

const AdminLogin= () => {
  const navigate = useNavigate();
  const [admin,setAdmin] = useState([])

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();
      const res = await axios.post(adminLoginRoute, { formData })
      if (res.data.status) {
        setFormData({
          name: '',
          email: '',
          password: ''
        })
        console.log(res.data.adminfilter);
        localStorage.setItem('cart-app-admin', JSON.stringify(res.data.adminfilter))
        setAdmin(res.data.adminfilter)
        toast.success("Login succesfull")
        navigate('/admin')
      }else{
        console.log(res);
        toast.error(res.data.msg)
      }

  }
  return (
    <AuthWrapper>
      <AuthCard>
        <Title>Welcome Back, Admin</Title>
        <Input name='name' value={formData.name} onChange={handleChange} type="text" placeholder="Enter your unique name" />
        <Input name='email' value={formData.email} onChange={handleChange} type="email" placeholder="Email" />
        <Input name='password' value={formData.password} onChange={handleChange} type="password" placeholder="Password" />
        <Button onClick={handleSubmit}>Login</Button>
      </AuthCard>
    </AuthWrapper>
  );
};

export default AdminLogin;
