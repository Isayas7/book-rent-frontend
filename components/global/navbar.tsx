"use client";
import { AuthContext } from "@/context/AuthContext";
import { UserRole } from "@/utils/schema";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ backgroundColor: "var(--bgCard)", p: 2, borderRadius: 2, fontSize: 18 }}>
      {user?.role === UserRole.ADMIN ? "Admin/" : user?.role === UserRole.OWNER ? "Owner/" : ""}
      {pathname.split("/").pop()}
    </Box>
  );
};

export default Navbar;
