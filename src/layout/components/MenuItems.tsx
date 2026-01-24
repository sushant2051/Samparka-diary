import MenuLink from "./MenuLink";
import { MenuList } from "../menuItem";

interface MenuItemsProps {
  onClose?: () => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ onClose }) => {
  return (
    <div className="flex flex-col gap-1">
      <nav className="flex flex-col gap-2">
        {MenuList.map((item) => {
          return (
            <MenuLink
              key={item.id}
              route={`${item.routekey}`}
              label={item.label}
              icon={item.icon}
              onClose={onClose}
            />
          );
        })}
      </nav>
    </div>
  );
};

export default MenuItems;
