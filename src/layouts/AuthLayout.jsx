import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#F3F7FD] flex flex-col items-center justify-center">
      <Outlet />
    </div>
  );
}
