import { Fragment } from "react";
import MenuItems from "./MenuItems";
import Logout from "./Logout";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  return (
    <Fragment>
      {isOpen && (
        <div
          data-testid="overlay"
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity "
          onClick={onClose}
        />
      )}

      <div
        className={`fixed bg-black h-full text-white p-4 inset-y-0 right-0 z-50 w-full max-w-64 transform space-y-4  px-4 shadow-xl transition-transform duration-300 dark:bg-gray-900 ${isOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <p className="text-xl font-bold text-center py-4">Test User</p>
        <MenuItems onClose={onClose} />
        <div className="py-8 flex items-center justify-center">
          <Logout />
        </div>
      </div>
    </Fragment>
  );
};

export default MobileNav;
