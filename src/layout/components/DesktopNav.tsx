import Logout from "./Logout";
import MenuItems from "./MenuItems";

const DesktopNav = () => {
  return (
    <div className="z-50 hidden bg-black h-full p-4 text-white md:flex">
      <div className="flex flex-col gap-2 p-4">
        <p className="text-xl font-bold text-center py-4">Test User</p>
        <MenuItems />
        <div className="py-8 flex items-center justify-center">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
