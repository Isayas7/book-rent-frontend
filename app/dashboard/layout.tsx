"use client"
import Navbar from "@/components/global/navbar";
import Sidebar from "@/components/global/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

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

  const [open, setOpen] = useState<boolean>(false)
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flex: 1, height: "100vh", width: open ? 100 : 240, position: "fixed", top: 0 }}>
        <Sidebar open={open} setOpen={setOpen} />
      </Box>
      <Box sx={{ flex: 4, p: 1, ml: open ? 12 : 30, width: "100vh" }}>
        <Navbar />
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
