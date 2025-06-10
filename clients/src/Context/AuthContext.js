import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCartRoute } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  /// === GLOBAL STATES === ////
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState([]);

/// === FUNTION FOR GETTING USER FROM LOCAL STORAGE === ///
   const getCurrentUser = async () => {
  const localUser = JSON.parse(localStorage.getItem('cart-app-user'));
  if (localUser) {
    setUser(localUser);
    await getCartItems(localUser); // <-- pass the user directly
  }


  }

  /// === Getting cart items ===///
const getCartItems = async (passedUser = user) => {
  if (!passedUser) return;
  try {
    const res = await axios.post(getCartRoute, {
      user: passedUser._id,
    });
    if (res) {
      const itemsWithQty = res.data.items.map(item => ({
        ...item,
        quantity: item.quantity || 1,
      }));
      setCartItems(itemsWithQty);
    }
  } catch (err) {
    toast.error("Error fetching cart items");
  }
};

  var total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0); /// total price of cart items for place order and cart page
  useEffect(() => {
    getCurrentUser()
  }, [])

  /// LOGIN HANDLER ///
  const login = (userData) => {
    localStorage.setItem('cart-app-user', JSON.stringify(userData))
    setUser(userData);

  };
  /// LOGOUT HANDLER ///
  const logout = () => {
    setUser(null);
    localStorage.clear('cart-app-user')
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setSearch, search, getCartItems, cartItems, setCartItems,total }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
