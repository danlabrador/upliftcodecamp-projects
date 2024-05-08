import { Nav } from '../../components/Nav';
import { Outlet } from 'react-router-dom';

const ProtectedLayout = () => {
  return (
    <>
      <div className="flex bg-slate-50 min-h-svh">
        <Nav />
        <div className="w-[70px]" />
        <div className="flex p-6 w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ProtectedLayout;
