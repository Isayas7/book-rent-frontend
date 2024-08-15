import { useState } from 'react';
import {
  MaterialReactTable,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState
} from 'material-react-table';
import { Typography } from '@mui/material';
import axios from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

type GenericApiResponse<T> = {
  data: T[];
};

type GenericTableProps<T extends MRT_RowData> = {
  fetchUrl: string;
  columns: MRT_ColumnDef<T>[];
  queryKey: string;
  maxHeight: string;
  title: string;
};

const GenericTable = <T extends MRT_RowData>({
  fetchUrl,
  columns,
  queryKey,
  maxHeight,
  title
}: GenericTableProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const { data, isError, isRefetching, isLoading, refetch } = useQuery<GenericApiResponse<T>>({
    queryKey: [
      queryKey,
      columnFilters,
      globalFilter
    ],
    queryFn: async () => {
      const fetchURL = new URL(fetchUrl, 'http://localhost:8000');

      // Convert filters object to query string
      const filterParams = new URLSearchParams();

      // Add globalFilter
      if (globalFilter) {
        filterParams.set('globalFilter', globalFilter);
      }

      // Add columnFilters
      columnFilters.forEach(filter => {
        if (filter.id && filter.value) {
          filterParams.set(filter.id, filter.value);
        }
      });

      // Set the search parameters
      fetchURL.search = filterParams.toString();

      const response = await axios.get<GenericApiResponse<T>>(fetchURL.href, { withCredentials: true });
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const table = useMaterialReactTable({
    enableColumnActions: false,
    enableSorting: false,

    enablePagination: false,
    enableTableFooter: false,
    enableStickyFooter: false,
    enableBottomToolbar: false,
    columns,
    data: data?.data ?? [],
    state: {
      columnFilters,
      globalFilter,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
    },
    manualFiltering: true,
    initialState: { showColumnFilters: false },
    renderTopToolbarCustomActions: () => (
      <Typography variant="h6" sx={{ fontWeight: 600, ml: 3, fontSize: 16 }}>
        {title}
      </Typography>
    ),
    muiTableContainerProps: { sx: { maxHeight, p: 2 } },
    muiTableHeadCellProps: { sx: { fontWeight: 'normal' } },
    muiToolbarAlertBannerProps: isError ? { color: 'error', children: 'Error loading data' } : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
  });

  return <MaterialReactTable table={table} />;
};

export default GenericTable;
