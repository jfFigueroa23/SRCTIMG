import { createTheme } from "@mui/material";
import { blue, red, purple, green, grey } from "@mui/material/colors";

export const purpleTheme = createTheme({
    palette: {
        primary: {
            light: '#536dfe',
            main: '#3d5afe', // Azul rey
            dark: '#304ffe',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#504a84',
            main: '#2d275e',
            dark: '#1a1842',
            contrastText: '#ffffff',
        },
        error: {
            light: red[300],
            main: red.A400,
            dark: red[700],
            contrastText: '#ffffff',
        },
        warning: {
            light: '#ffcc80',
            main: '#ffa726',
            dark: '#fb8c00',
            contrastText: '#000000',
        },
        info: {
            light: blue[300],
            main: blue[500],
            dark: blue[700],
            contrastText: '#ffffff',
        },
        success: {
            light: green[300],
            main: green[500],
            dark: green[700],
            contrastText: '#ffffff',
        },
        background: {
            default: grey[100],
            paper: '#ffffff',
        },
        text: {
            primary: blue[900],
            secondary: '#2d275e',
            disabled: grey[500],
            hint: grey[400],
        },
        icons: {
            main: blue.A400,
        },
        divider: grey[300],
    },
});
