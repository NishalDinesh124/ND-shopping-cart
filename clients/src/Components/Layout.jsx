import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Child route will render here */}
      <Outlet />
      
    </>
  );
};

export default Layout;
