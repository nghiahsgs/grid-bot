import { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];

export enum EMenu {
  ORDER = "ORDER",
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
];
