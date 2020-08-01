import {createMuiTheme} from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        primary1Color: "#00e676",
        primary2Color: "#00e676",
        primary3Color: "#3f51b5",

        accent1Color: "#4db6ac",
        accent2Color: "#64b5f6",

        textColor: "#263238",
        secondaryTextColor: "#37474f",

        canvasColor: "#ffffff",
        borderColor: "#cfd8dc",
        disabledColor: "#90a4ae",
        pickerHeaderColor: "#c62828"
    },



    overrides: {
        MuiCard: {
            root: {
                borderRadius: 32
            }
        },
        MuiTabs: {
            root: {
                backgroundColor: "#00C198"
            },
            indicator: {
                background: "#00E2DC"
            },
        },

        MuiButton: {
            root: {
                backgroundColor: "#00C198"
            }
        },
        MuiFilledInput: {
            root: {
                backgroundColor: "#ffffff",
                "&:hover": {
                    backgroundColor: "#e5e5e5"
                },
                "&:focused": {
                    backgroundColor: "#e5e5e5"
                }

            },

        }
    },
});

