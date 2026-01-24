import type { IconType } from "react-icons";

export interface NavigationProps {
  id: string;
  label: string;
  icon?: IconType;
  routekey: string;
}
