"use client"
import {
  adminOwnerColumns,
} from "@/components/tables/columns/admin-owner-columns";
import GenericTable from "@/components/tables/custom-table";
import { Box } from "@mui/material";
import React from "react";


export default function Owners() {

  return (
    <Box>
      <GenericTable
        columns={adminOwnerColumns}
        maxHeight="470px"
        title="List of Owner"
        fetchUrl="/api/user/owner-list"
        queryKey="ownerList"
      />

    </Box>

  );
}
