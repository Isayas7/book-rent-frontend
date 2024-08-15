"use client"
import {
  adminBookColumns,
} from "@/components/tables/columns/admin-book-columns";
import GenericTable from "@/components/tables/custom-table";
import { Box } from "@mui/material";
import React from "react";


export default function Books() {


  return (
    <Box sx={{
      width: "100%",
      overflowX: "scroll",
    }}>

      <GenericTable
        columns={adminBookColumns}
        maxHeight="470px"
        title="List of Books"
        fetchUrl="api/book/allBooks"
        queryKey="allBooks"
      />



    </Box>
  );
}
