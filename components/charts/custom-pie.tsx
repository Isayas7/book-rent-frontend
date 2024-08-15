"use client";
import { Box, Typography } from "@mui/material";
import React, { PureComponent } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

// Book category colors
const colors: { [key: string]: string } = {
  Fantasy: "#0088FE",
  Fiction: "#00C49F",
  Science: "#FFBB28",
  Business: "#FF8042",
};

interface BookCategoryCounts {
  [category: string]: number;
}

interface CategoryListProps {
  data?: BookCategoryCounts;
}

export default class CustomPie extends PureComponent<CategoryListProps> {
  static defaultProps = {
    data: {},
  };

  render() {
    const { data } = this.props;

    // Safeguard against undefined or null data
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            px: 2,
            py: 3,
          }}
        >
          <Typography variant="h6">There is no books uploaded</Typography>
        </Box>
      );
    }

    // Convert data to format suitable for PieChart
    const pieChartData = Object.entries(data).map(([category, count]) => ({
      name: category,
      value: count,
    }));

    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            justifyContent: "space-between",
            pt: 2,
            px: 2,
          }}
        >
          <Typography>Available Books</Typography>
          <Typography
            sx={{
              backgroundColor: "var(--softbg)",
              p: 0.5,
              borderRadius: "10%",
            }}
          >
            Today
          </Typography>
        </Box>
        <PieChart width={250} height={200}>
          <Pie
            data={pieChartData}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[entry.name] || "#000"}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            px: 2,
            pb: 1,
          }}
        >
          {Object.entries(data).map(([category, count]) => (
            <Box
              key={category}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 1,
                px: 2,
                py: 1,
              }}
            >
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  backgroundColor: colors[category] || "#000",
                  borderRadius: "50%",
                }}
              />
              <Typography>{category}</Typography>
              <Typography>{count}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
}
