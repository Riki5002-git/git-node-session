import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const Layout = () => {
  return (
    <>
      <Menu />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;