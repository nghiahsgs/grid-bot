import { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

export enum EMenu {
  ORDER = "ORDER",
  SETTINGS = "SETTINGS",
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  children?: MenuItem[],
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
export const items: MenuItem[] = [
  getItem(<Link href={"/order"}>Order</Link>, EMenu.ORDER),
  getItem(<Link href={"/settings"}>Settings</Link>, EMenu.SETTINGS),
];
