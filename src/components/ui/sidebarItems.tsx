import type { MenuProps } from "antd";
import {
  MergeCellsOutlined,
  ProfileOutlined,
  TableOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  MenuOutlined,
  BorderlessTableOutlined,
  BlockOutlined,
  CompressOutlined,
  RobotOutlined,
  SendOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { ENUM_USER_ROLE } from "@/app/constants/role";

export const SidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}`}>Account Profile</Link>,
      key: `/${role}`,
      icon: <TeamOutlined />,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <MergeCellsOutlined />,
      key: `/${role}/manage-admin`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/menu`}>Create Menu</Link>,
      icon: <MenuOutlined />,
      key: `/${role}/menu`,
    },
    {
      label: <Link href={`/${role}/today-mean`}>Today meal</Link>,
      icon: <TableOutlined />,
      key: `/${role}/today-meal`,
    },
    {
      label: <Link href={`/${role}/upcoming-food`}>Upcoming Food</Link>,
      icon: <SendOutlined />,
      key: `/${role}/upcoming-food`,
    },
    {
      label: <Link href={`/${role}/price-and-plan`}>price & Plan</Link>,
      icon: <TableOutlined />,
      key: `/${role}/price-and-plan`,
    },
    {
      label: <Link href={`/${role}/subscription`}>Subscription</Link>,
      icon: <BorderlessTableOutlined />,
      key: `/${role}/subscription`,
    },
    {
      label: <Link href={`/${role}/see-feedback`}>See Feedback</Link>,
      icon: <CompressOutlined />,
      key: `/${role}/see-feedback`,
    },
    {
      label: <Link href={`/${role}/faq`}>FAQ</Link>,
      icon: <BlockOutlined />,
      key: `/${role}/faq`,
    },
    {
      label: <Link href={`/${role}/blog`}>Blog</Link>,
      icon: <RobotOutlined />,
      key: `/${role}/blog`,
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/today-meal`}>Today Meal</Link>,
      icon: <TableOutlined />,
      key: `/${role}/today-meal`,
    },
    {
      label: <Link href={`/${role}/subscription`}>Subscription</Link>,
      icon: <BorderlessTableOutlined />,
      key: `/${role}/subscription`,
    },
    {
      label: <Link href={`/${role}/feedback`}>Feedback</Link>,
      icon: <CompressOutlined />,
      key: `/${role}/feedback`,
    },
  ];

  if (role === ENUM_USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === ENUM_USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === ENUM_USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
