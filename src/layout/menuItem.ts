import {
  MdDashboard,
  MdContacts,
  MdNotifications,
  MdNote,
  MdEmergency,
  MdSettings,
} from "react-icons/md";

import type { NavigationProps } from "./types";

export const MenuList: NavigationProps[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    routekey: "",
  },
  {
    id: "contacts",
    label: "Contacts",
    icon: MdContacts,
    routekey: "/contacts",
  },
  {
    id: "reminders",
    label: "Reminders",
    icon: MdNotifications,
    routekey: "/reminder",
  },
  {
    id: "notes",
    label: "Notes",
    icon: MdNote,
    routekey: "/notes",
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: MdEmergency,
    routekey: "/emergency",
  },
  {
    id: "setting",
    label: "Settings",
    icon: MdSettings,
    routekey: "/settings",
  },
];
