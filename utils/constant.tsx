import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';

type AdminLink = {
  title: string;
  path: string;
  icon: React.ReactElement;
  id: string
  disable: boolean
};

export const sideBarMenu: AdminLink[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlinedIcon />,
    id: "dashboard",
    disable: false
  },
  {
    title: "Dashboard",
    path: "/dashboard/owner",
    icon: <DashboardOutlinedIcon />,
    id: "ownerDashboard",
    disable: false
  },
  {
    title: "Books",
    path: "/dashboard/books",
    icon: <BookmarksOutlinedIcon />,
    id: "books",
    disable: false
  },
  {
    title: "Owners",
    path: "/dashboard/owners",
    icon: <PersonOutlineOutlinedIcon />,
    id: "owners",
    disable: false
  },
  {
    title: "Book Upload",
    path: "/dashboard/bookUpload",
    icon: <BookmarkAddOutlinedIcon />,
    id: "bookUpload",
    disable: false
  },
  {
    title: "Other",
    path: "/dashboard/other",
    icon: <ApiOutlinedIcon />,
    id: "other",
    disable: true
  },
  {
    title: "Notification",
    path: "/dashboard/notification",
    icon: <NotificationsNoneOutlinedIcon />,
    id: "notification",
    disable: true
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsIcon />,
    id: "settings",
    disable: true
  },
  {
    title: "Login as",
    path: "/login",
    icon: <AccountCircleOutlinedIcon />,
    id: "loginAs",
    disable: false
  },
];

