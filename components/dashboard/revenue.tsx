import { Box, Divider, Typography } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';

export interface RentalStatistics {
  currentMonthTotal: number;
  previousMonthTotal: number;
  percentageChange: number;
  trend: 'increasing' | 'decreasing' | 'no change';
}
interface RevenueProps {
  data: RentalStatistics | null;
}

const Revenue: React.FC<RevenueProps> = ({ data }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FDFDFD",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        borderRadius: 1,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Typography>Income</Typography>
        <Typography
          sx={{
            backgroundColor: "var(--softbg)",
            p: 0.5,
            borderRadius: "10%",
          }}
        >
          This Month
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          mt: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
          ETB {data?.currentMonthTotal.toFixed(3)}
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Box>
            {data?.trend === "no change" ? (
              <BalanceOutlinedIcon color="action" />
            ) : data?.trend === "decreasing" ? (
              <ArrowDownwardIcon color="success" />
            ) : (
              <ArrowUpwardIcon color="error" />
            )}
          </Box>
          <Typography>{data?.percentageChange.toFixed(1)}%</Typography>
        </Box>
      </Box>
      <Box>
        <Typography sx={{ fontSize: 12, opacity: 0.8 }}>
          Compered to ETB {data?.previousMonthTotal.toFixed(3)} last month
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            Last Month Income
          </Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
            ETB {data?.previousMonthTotal.toFixed(3)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Revenue;
