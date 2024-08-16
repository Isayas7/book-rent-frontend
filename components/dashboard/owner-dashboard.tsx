import CustomChart from "@/components/charts/custom-chart";
import CustomPie from "@/components/charts/custom-pie";
import Revenue from "@/components/dashboard/revenue";
import { Box, Typography } from "@mui/material";
import React from "react";
import GenericTable from "@/components/tables/custom-table";
import { ownerLiveBookColumns } from "../tables/columns/owner-live-book-columns";
import { format } from 'date-fns';
import { getFreeOwnerBooksQuery, getOwnRentalQuery } from "@/hooks/use-books-query";


const OwnerDashboard = () => {
  const { data } = getOwnRentalQuery()
  const { data: freeOwnerBooks } = getFreeOwnerBooksQuery()


  const now = new Date();
  const formattedDate = format(now, 'EEE, dd MMM, yyyy, HH:mm');
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      {/* Left */}
      <Box
        sx={{
          backgroundColor: "var(--bgCard)",
          p: 2,
          flex: 1,
          borderRadius: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600, opacity: 0.8 }}>
          This Month statistics
        </Typography>
        <Typography sx={{ fontSize: 14, opacity: 0.6 }}>
          {formattedDate}
        </Typography>
        <Revenue data={data} />
        <Box
          sx={{
            mt: 3,

            borderRadius: 2,
            backgroundColor: "#FDFDFD",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <CustomPie data={freeOwnerBooks} />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{
        flex: 3,
        maxWidth: "800px",
        overflowX: "scroll",
      }}>
        <GenericTable
          columns={ownerLiveBookColumns}
          maxHeight="300px"
          title="Live Book status"
          fetchUrl="/api/book/ownBooks"
          queryKey="ownBooks"
        />
        <Box
          sx={{
            mt: 2,
            p: 3,
            borderRadius: 2,
            width: "100%",
            height: "350px",
            backgroundColor: "var(--bgCard)",
          }}
        >
          <CustomChart />
        </Box>
      </Box>
    </Box>
  );
};

export default OwnerDashboard;
