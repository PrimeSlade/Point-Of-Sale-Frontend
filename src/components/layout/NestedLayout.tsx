import { Outlet } from "react-router-dom";

const NestedLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NestedLayout;
