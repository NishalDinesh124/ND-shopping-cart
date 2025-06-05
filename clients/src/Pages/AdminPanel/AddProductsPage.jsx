import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios'
import { addProductsRoute } from '../../Utils/APIRoutes';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  font-family: Inter;
  background: ${({ theme }) => theme.colors.white};
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: 2rem;
`;

const Form = styled.form`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .field{
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  }
`;

const Label = styled.label`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  width: 100%;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#20ac66'};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#20ac66'};
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  min-height: 120px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#20ac66'};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary || '#20ac66'};
  color: white;
  border: none;
  padding: 0.9rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || '#178a4f'};
  }
`;


const AddProductsPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    price: '',
    image: '',
    description: '',
  });


  
  useEffect(() => {
    const admin = localStorage.getItem('cart-app-admin')
    if (!admin) {
      navigate('/admin/login')
    }
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Product:', formData);
    const res = await axios.post(addProductsRoute, { formData })
    if (res.data)
      toast.success("Product added succesfully")
    setFormData({
      name: '',
      category: 'Laptops',
      price: '',
      image: '',
      description: '',
    });
  };

  return (
    <Wrapper>
      <MainContent>
        <Title>Add New Product</Title>
        <Form onSubmit={handleSubmit}>
          <div className='field'>
            <Label>Product Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className='field'>
            <Label>Category</Label>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option value="Laptops">Laptops</option>
              <option value="Smartwatches">Smartwatches</option>
              <option value="Mobile Phones">Mobile Phones</option>
            </Select>
          </div>

          <div className='field'>
            <Label>Price ($)</Label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className='field'>
            <Label>Image URL</Label>
            <Input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste product image URL"
              required
            />
          </div>

          <div className='field'>
            <Label>Description</Label>
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a short description"
            />
          </div>

          <Button type="submit">Add Product</Button>
        </Form>
      </MainContent>
    </Wrapper>
  );
};

export default AddProductsPage;
