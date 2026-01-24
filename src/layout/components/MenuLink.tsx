import type { IconType } from "react-icons";
import { NavLink, useLocation } from "react-router";

interface MenuLinkProps {
  route: string;
  icon?: IconType;
  label: string;
  onClose?: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({
  route,
  icon: Icon,
  label,
  onClose,
}) => {
  const location = useLocation();

  const isActive = route && location.pathname === route;

  return (
    <div>
      <div
        className={`
          hover:bg-gray-800 flex cursor-pointer items-center rounded-md p-1",
          ${isActive && "bg-gray-700"}`}
      >
        <NavLink
          to={route!}
          className="flex w-full cursor-pointer items-center gap-2 p-2"
          onClick={onClose}
        >
          {Icon && <Icon className="text-lg " />}
          {label}
        </NavLink>
      </div>
    </div>
  );
};

export default MenuLink;
