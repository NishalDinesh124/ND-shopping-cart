import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

/// === STYLED COMPONENTS === ///
const NavbarContainer = styled.nav`
  font-family: Inter;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10; 
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isopen'
})`
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0.5em;
    right: 0.5em;
    background-color: ${({ theme }) => theme.colors.primary};
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
    z-index: 9999;
    visibility: ${({ isopen }) => (isopen ? 'visible' : 'hidden')};
    opacity: ${({ isopen }) => (isopen ? 1 : 0)};
    border-bottom-left-radius: 5em;
    border-bottom-right-radius: 5em;
  }
`;


const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  border-bottom: solid 0px ${({ theme }) => theme.colors.white};

  &:hover {
   border-bottom: solid 3px ;
  }
  @media (max-width: 768px) {
     color: ${({ theme }) => theme.colors.white};
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  /// === STATES === ///
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev); /// MENUBAR TOOGLING


  /// === HANDLING LOGOUT === ///
  const handleLogout = async () => {
    toast.info("Logged out succesfully")
    localStorage.clear('cart-app-admin');
    navigate('/admin');
  }

  return (
    <NavbarContainer>

      <MenuButton onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </MenuButton>
      <NavLinks isopen={menuOpen}>
        <NavLink to="/admin" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/admin/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>
        <NavLink to="/admin/users" onClick={() => setMenuOpen(false)}>Users</NavLink>
        <NavLink onClick={handleLogout}>LogOut</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
