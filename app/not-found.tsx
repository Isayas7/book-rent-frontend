"use client"
import { Box, Typography, Button } from "@mui/material";
import { SentimentDissatisfied } from "@mui/icons-material";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter()
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
            padding={3}
        >
            <SentimentDissatisfied
                color="action"
                style={{ fontSize: 100 }}
            />
            <Typography
                variant="h4"
                gutterBottom
                mt={2}
            >
                Oops! Page Not Found
            </Typography>
            <Typography
                variant="body1"
                color="textSecondary"
                mb={4}
            >
                Sorry, the page you are looking for does not exist.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => router.back()}
            >
                Go to Back
            </Button>


        </Box>
    );
}

export default NotFound;
