"use client";
import { useState } from "react"; // Import useState
import { Box, Switch } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import Image from "next/image";
import DoneIcon from "@mui/icons-material/Done";
import { useChangeBookStatusQuery } from "@/hooks/use-books-query";
import { toast } from "react-toastify";

export type adminBookColumnsTypes = {
  id: string;
  author: string;
  username: string;
  category: string;
  bookName: string;
  status: string;
  coverPhotoUrl: string
};

const label = { inputProps: { "aria-label": "Switch demo" } };

export const adminBookColumns: MRT_ColumnDef<adminBookColumnsTypes>[] = [
  {
    accessorKey: "id",
    header: "No.",
    size: 40,
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 40,
  },
  {
    accessorKey: "username",
    header: "Owner",
    size: 150,
    Cell: ({ row }) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Image
          src={row.original.coverPhotoUrl || "/woman.png"}
          alt="woman"
          width={24}
          height={24}
          style={{ borderRadius: "50%", border: "1px solid grey" }}
        />
        <Box>{row.original.username}</Box>
      </Box>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
  },
  {
    accessorKey: "bookName",
    header: "Book Name ",
    size: 200,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 150,

    Cell: ({ row }) => {
      const [checked, setChecked] = useState(row.original.status === "APPROVED");
      const mutation = useChangeBookStatusQuery();

      const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        const newStatus = row.original.status === "APPROVED" ? "APPROVE" : "APPROVED"
        mutation.mutate({ bookId: row.original.id, newStatus }, {
          onSuccess: () => {
            toast.success(`Successfully ${row.original.status === "APPROVED" ? "disapproved" : "approved"}`)
          },
        });
      };

      return (
        <Box
          sx={{
            backgroundColor: "#E6F3E6",
            py: 0.1,
            px: 1,
            gap: 0.5,
            borderRadius: "10%",
            display: "flex",
            alignItems: "center",
            color: "#14a514",
          }}
        >
          <DoneIcon sx={{ fontSize: 18 }} />
          {row.original.status}
          <Switch
            {...label}
            size="medium"
            color="success"
            checked={checked}
            onChange={handleSwitchChange}
          />
        </Box>
      );
    },
  },
];
