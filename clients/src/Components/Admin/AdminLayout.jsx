import Navbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <AdminSidebar/>
      {/* Child route will render here */}
      <Outlet />
    </>
  );
};

export default AdminLayout;
