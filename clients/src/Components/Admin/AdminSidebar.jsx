import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTachometerAlt, FaBoxOpen, FaShoppingCart, FaPlus, FaUsers, FaBars, FaTimes, FaHome } from 'react-icons/fa';
import { GiShoppingCart } from "react-icons/gi";
import { Link } from 'react-router-dom';

/// === STYLED COMPONENTS === ///
const SidebarWrapper = styled.aside`
font-family: Inter;
  width: 250px;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.dark};
  height: 100vh;
  position: fixed;
  left: ${({ open }) => (open ? '0' : '-100%')};
  top: 0em;
  transition: left 0.3s ease;
  z-index: 1000;
  padding-top: 4rem;

 
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  margin: 0em 3rem;
  font-weight: bold;
  display: flex;
  color: ${({ theme }) => theme.colors.textLight};
  text-decoration: none;
  svg{
    font-size: 30px;
  }
`;
const SidebarToggle = styled.button`
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.6rem 0.8rem;
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

 
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NavItem = styled(Link)`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.dark};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  svg {
    margin-right: 0.75rem;
  }
`;

const AdminSidebar = () => {
  /// === STATES === ///

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);  /// SIDEBAR TOGGLING

  return (
    <>
      <SidebarToggle onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </SidebarToggle>

      <SidebarWrapper open={isOpen}>
        <Logo to="/admin">NDCart <span>   .</span><GiShoppingCart /></Logo>
        <NavList>
          <NavItem to='/admin' ><FaTachometerAlt /> Dashboard</NavItem>
          <NavItem to='/admin/orders'><FaShoppingCart /> Orders</NavItem>
          <NavItem to='/admin/products'><FaBoxOpen /> Products</NavItem>
          <NavItem to='/admin/users'><FaUsers /> Users</NavItem>
          <NavItem to='/admin/add-products'><FaPlus /> Add products</NavItem>
           <NavItem to='/'><FaHome /> Users page</NavItem>
        </NavList>
      </SidebarWrapper>
    </>
  );
};

export default AdminSidebar;
