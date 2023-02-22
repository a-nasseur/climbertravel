import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
    palette: {
        primary: {
            main: '#FF7D00'
        },
        secondary: {
            main: '#000'
        }
    },
});

// Setting the automatic responsive size on theme
theme = responsiveFontSizes(theme);

export default theme;