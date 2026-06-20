import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopAppBar from '../components/TopAppBar';
import BottomNav from '../components/BottomNav';

export default function DashboardLayout() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 md:ml-[260px] min-h-screen flex flex-col">
        <TopAppBar />
        <div className="flex-1 p-margin-mobile md:p-margin-desktop max-w-[1000px] mx-auto w-full pb-32">
          <Outlet />
        </div>
      </div>
      <BottomNav />
    </>
  );
}
