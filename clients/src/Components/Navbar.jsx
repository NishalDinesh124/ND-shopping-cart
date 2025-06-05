import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from '../Context/AuthContext';
import { IoHomeOutline, IoCartOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const NavbarContainer = styled.nav`
  font-family: Inter;
  overflow: visible;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10; /* Make sure the navbar is above the content */
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  svg{
    font-size: 30px;
  }
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

const SearchBar = styled.input`
padding: 0.6rem 1rem;
    border: solid 2px ${({ theme }) => theme.colors.primary};
    border-radius: 21px;
    font-size: 1rem;
    outline: none;

    @media (max-width: 768px) {
      border: solid 2px ${({ theme }) => theme.colors.white};
      background: transparent;
      color:${({ theme }) => theme.colors.white};

      &::placeholder {
        color:${({ theme }) => theme.colors.white}; 
        opacity: 1;
      }
    }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  border-bottom: solid 3px white;
  padding: 0.6rem 0rem;
  svg{
    font-size: 25px;
  }

  &:hover {
   border-bottom: solid 3px ${({ theme }) => theme.colors.primary};
  }
   @media (max-width: 768px) {
     color: ${({ theme }) => theme.colors.textLight};
     border-bottom: solid 3px ${({ theme }) => theme.colors.primary};
     &:hover {
   border-bottom: solid 3px ${({ theme }) => theme.colors.white};
  }
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
  const {user, search, setSearch } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <NavbarContainer>
      <Logo to="/">NDCart<GiShoppingCart /></Logo>
      <MenuButton onClick={toggleMenu}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </MenuButton>
      <NavLinks isopen={menuOpen}>
        <SearchBar
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <NavLink to="/" onClick={() => setMenuOpen(false)}><IoHomeOutline /></NavLink>
        <NavLink to="/cart" onClick={() => setMenuOpen(false)}><IoCartOutline /></NavLink>
        <NavLink to="/" onClick={() => setMenuOpen(false)}><IoHeartOutline /></NavLink>
        {user ? (
  <>
    <NavLink to={'/acc-details'}>
      <IoPersonOutline />
    </NavLink>
  </>
) : (
  <NavLink to="/auth" onClick={() => setMenuOpen(false)}>Login</NavLink>
)}

          <NavLink to="/admin" onClick={() => setMenuOpen(false)}><MdOutlineAdminPanelSettings/></NavLink>

      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
