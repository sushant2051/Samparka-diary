import { useState } from "react";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import { LuMenu } from "react-icons/lu";

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="z-50 h-auto  w-full border-r border-gray-200 sm:border-b md:h-screen md:bg-white dark:border-gray-800 dark:bg-gray-900">
      <DesktopNav />
      <button
        className="fixed top-2 right-2 cursor-pointer rounded-full bg-linear-to-l from-black/80 to-transparent p-2 text-white shadow-sm focus:outline-none md:hidden"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open Menu"
      >
        <LuMenu />
      </button>
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
