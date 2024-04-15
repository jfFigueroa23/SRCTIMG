import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: "#2d275e"
        },
        error: {
            main: red.A400
        }
    }
})