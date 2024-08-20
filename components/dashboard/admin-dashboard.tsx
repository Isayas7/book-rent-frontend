"use client"
import CustomChart from "@/components/charts/custom-chart";
import CustomPie from "@/components/charts/custom-pie";
import Revenue from "@/components/dashboard/revenue";
import { Box, Typography } from "@mui/material";
import {
  adminLiveBookColumns,

} from "@/components/tables/columns/admin-live-book-columns";
import GenericTable from "@/components/tables/custom-table";
import { getFreeBooksQuery, getRentalStaticsQuery } from "@/hooks/use-books-query";


const AdminDashboard = () => {
  const { data } = getRentalStaticsQuery()
  const { data: freeBooks } = getFreeBooksQuery()

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
          Tue, 14 Nov, 2024, 11:30
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
          <CustomPie data={freeBooks} />
        </Box>
      </Box>

      {/* Right */}
      <Box sx={{
        flex: 3,
        maxWidth: "800px",
        overflowX: "scroll",
      }}>


        <GenericTable
          columns={adminLiveBookColumns}
          maxHeight="300px"
          title="Live Book status"
          fetchUrl="api/book/all-books"
          queryKey="allBooks"
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

export default AdminDashboard;
