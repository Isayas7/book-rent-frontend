"use client"
import UploadBook from "@/components/forms/book-form";
import { Box, Typography } from "@mui/material";

export default function BookUpload() {

  return (
    <Box
      sx={{
        backgroundColor: "var(--bgCard)",
        height: "calc(100vh - 85px)",
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography>Upload New Book</Typography>
      <UploadBook />
    </Box>
  );
}
