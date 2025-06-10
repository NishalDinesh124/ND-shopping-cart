import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { GiShoppingCart } from "react-icons/gi";
import { useAuth } from '../Context/AuthContext';
import { IoHomeOutline, IoCartOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


/// === STYLED COMPONENTS === ///
const NavbarContainer = styled.nav`
  font-family: Inter;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  svg {
    font-size: 28px;
    margin-left: 0.3rem;
  }
`;

const NavLinks = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isopen'
})`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 70px;
    left: 0.5em;
    right: 0.5em;
    background-color: ${({ theme }) => theme.colors.primary};
    align-items: center;
    padding: 1.5rem 0.6rem;
    display: ${({ isopen }) => (isopen ? 'flex' : 'none')};
    z-index: 9999;
    visibility: ${({ isopen }) => (isopen ? 'visible' : 'hidden')};
    opacity: ${({ isopen }) => (isopen ? 1 : 0)};
    border-bottom-left-radius: 3em;
    border-bottom-right-radius: 3em;
    gap: 1rem;
  }
`;

const SearchBar = styled.input`
  padding: 0.5rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 999px;
  font-size: 0.95rem;
  outline: none;
  width: 200px;
  transition: all 0.3s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primaryHover || '#20ac66'};
    box-shadow: 0 0 0 2px rgba(32, 172, 102, 0.2);
  }

  @media (max-width: 768px) {
    width: 80%;
    background: transparent;
    border-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.white};

    &::placeholder {
      color: ${({ theme }) => theme.colors.white};
      opacity: 0.7;
    }
  }
`;

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: 700;
  border-bottom: 3px solid white;
  padding: 0.4rem 0;
  display: flex;
  align-items: center;

  svg {
    font-size: 22px;
  }

  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    color: ${({ theme }) => theme.colors.textLight};
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};

    &:hover {
      border-bottom: 3px solid ${({ theme }) => theme.colors.white};
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
  /// importing global states ///
  const { user, search, setSearch } = useAuth();
  /// === STATES === ///
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev); /// NAVBAR TOGGLING

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
          <NavLink to="/acc-details" onClick={() => setMenuOpen(false)}><IoPersonOutline /></NavLink>
        ) : (
          <NavLink to="/auth" onClick={() => setMenuOpen(false)}>Login</NavLink>
        )}
        <NavLink to="/admin" onClick={() => setMenuOpen(false)}><MdOutlineAdminPanelSettings /></NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
