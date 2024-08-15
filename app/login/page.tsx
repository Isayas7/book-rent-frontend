"use client"
import { Box, Divider, Typography } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LoginForm from "@/components/forms/login-form";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { user } = useContext(AuthContext);
  const router = useRouter()
  if (user) {
    router.push("/dashboard")
  }
  return (
    <Box>
      <Box sx={{ height: "100vh", color: "white" }}>
        {/* Left */}
        <Box sx={{ display: "flex" }}>
          <Box
            sx={{
              backgroundColor: "#171B36",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              height: "100vh",
            }}
          >
            <LocalLibraryIcon sx={{ width: 200, height: 200 }} />
          </Box>
          {/* Right */}
          <Box
            sx={{
              color: "black",
              display: "flex",
              p: 4,
              flex: 1,
              height: "100vh",
              alignItems: "center",
              width: "100%",
              backgroundColor: "var(--textWhite)",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,

                  alignItems: "center",
                  textAlign: "left",
                }}
              >
                <LocalLibraryIcon
                  sx={{ width: 50, height: 50, color: "#2929ad" }}
                />
                <Typography sx={{ fontSize: 25 }}>Book Rent</Typography>
              </Box>
              <Typography sx={{ mt: 2, fontSize: 20, textAlign: "left" }}>
                Login into Book Rent
              </Typography>
              <Divider variant="fullWidth" sx={{ width: "100%" }} />
              <LoginForm />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
