import UpdateBookForm from '@/components/forms/update-book-form'
import { Box, Typography } from '@mui/material'
import React from 'react'

export default function page({ params }: { params: { id: number } }) {
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
            <Typography>Update the Book</Typography>
            <UpdateBookForm bookId={params.id} />
        </Box>
    )
}

