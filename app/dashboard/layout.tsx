"use client"
import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter()
  const { user } = useContext(AuthContext);
  if (!user) {
    router.push("/login")
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1, height: "100vh", position: "fixed", top: 0 }}>
        <Sidebar />
      </Box>
      <Box sx={{ flex: 4, p: 1, ml: 30, width: "100vh" }}>
        <Navbar />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
