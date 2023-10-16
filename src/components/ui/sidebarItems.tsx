import type { MenuProps } from "antd";
import {
  MergeCellsOutlined,
  TableOutlined,
  UserOutlined,
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
      label: "Manage User",
      key: "admin-manage-user",
      icon: <UserOutlined />,
      children: [
        {
          label: <Link href={`/${role}/manage-user/see-all`}>See All</Link>,
          key: `/${role}/manage-user/see-all`,
        },
        {
          label: <Link href={`/${role}/manage-user/create`}>Create</Link>,
          key: `/${role}/manage-user/create`,
        },
      ],
    },
    {
      label: "Menu",
      key: "admin-menu",
      icon: <MenuOutlined />,
      children: [
        {
          label: <Link href={`/${role}/menu/see-all`}>See All</Link>,
          key: `/${role}/menu/see-all`,
        },
        {
          label: <Link href={`/${role}/menu/create`}>Create</Link>,
          key: `/${role}/menu/create`,
        },
      ],
    },
    {
      label: "Upcoming Menu",
      icon: <SendOutlined />,
      key: `/${role}/upcoming-menu`,
      children: [
        {
          label: <Link href={`/${role}/upcoming-menu/see-all`}>See All</Link>,
          key: `/${role}/upcoming-menu/see-all`,
        },
        {
          label: <Link href={`/${role}/upcoming-menu/create`}>Create</Link>,
          key: `/${role}/upcoming-menu/create`,
        },
      ],
    },
    {
      label: "Today meal",
      icon: <TableOutlined />,
      key: `admin-today-meal`,
      children: [
        {
          label: <Link href={`/${role}/today-meal/see-all`}>See All</Link>,
          key: `/${role}/today-meal/see-all`,
        },
        {
          label: <Link href={`/${role}/today-meal/create`}>Create</Link>,
          key: `/${role}/today-meal/create`,
        },
      ],
    },
    {
      label: "price & Plan",
      icon: <TableOutlined />,
      key: `/${role}/price-and-plan`,
      children: [
        {
          label: <Link href={`/${role}/price-and-plan/see-all`}>See All</Link>,
          key: `/${role}/price-and-plan/see-all`,
        },
        {
          label: <Link href={`/${role}/price-and-plan/create`}>Create</Link>,
          key: `/${role}/price-and-plan/create`,
        },
      ],
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
    {
      label: "FAQ",
      icon: <BlockOutlined />,
      key: `/${role}/faq`,
      children: [
        {
          label: <Link href={`/${role}/faq/see-all`}>See All</Link>,
          key: `/${role}/faq/see-all`,
        },
        {
          label: <Link href={`/${role}/faq/create`}>Create</Link>,
          key: `/${role}/faq/create`,
        },
      ],
    },
    {
      label: "Blog",
      icon: <RobotOutlined />,
      key: `/${role}/blog`,
      children: [
        {
          label: <Link href={`/${role}/blog/see-all`}>See All</Link>,
          key: `/${role}/blog/see-all`,
        },
        {
          label: <Link href={`/${role}/blog/create`}>Create</Link>,
          key: `/${role}/blog/create`,
        },
      ],
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
      label: "Feedback",
      icon: <CompressOutlined />,
      key: `/${role}/feedback`,
      children: [
        {
          label: <Link href={`/${role}/feedback/see-all`}>See All</Link>,
          key: `/${role}/feedback/see-all`,
        },
        {
          label: <Link href={`/${role}/feedback/create`}>Create</Link>,
          key: `/${role}/feedback/create`,
        },
      ],
    },
  ];

  if (role === ENUM_USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === ENUM_USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === ENUM_USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
