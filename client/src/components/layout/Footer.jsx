import Copyright from "./Copyright";
import Box from "@mui/material/Box";
import * as React from "react";

export default function Footer() {
    return (
        <Box sx={{bgcolor: 'background.paper', p: 6}} component="footer">
            <Copyright/>
        </Box>
    )

}