import { createTheme } from "@mui/material/styles";
const defaultTheme = createTheme();
const { breakpoints } = defaultTheme;

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2F3438",
      dark: "#1C1F23",
      light: "#7d8c8b33",
    },
    secondary: {
      main: "#81FEB7",
      dark: "#273833",
      contrastText: "#1C1F23",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#DDDDDD",
    },
    error: {
      main: "#ED254E",
    },
    info: {
      main: "#3866F9",
    },
    warning: {
      main: "#FFC839",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: "Roboto Mono",
    h1: {
      fontSize: 30,
      [breakpoints.down("xs")]: {
        fontSize: 22,
      },
    },
    subtitle1: {
      fontSize: 32,
    },
    subtitle2: {
      fontSize: 16,
      fontWeight: 400,
    },
    h3: {
      fontSize: 35,
      fontWeight: 400,
      fontFamily: "Roboto",
    },
    h2: {
      fontSize: 24,
    },
    h4: {
      fontSize: 21,
      [breakpoints.down("xs")]: {
        fontSize: 16,
      },
    },
    h5: {
      fontSize: 16,
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    body1: {
      fontSize: 18,
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    body2: {
      fontSize: 16,
      [breakpoints.down("xs")]: {
        fontSize: 14,
      },
    },
    h6: {
      fontSize: 14,
    },
  },
  components: {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: "#3D3D3D",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          maxWidth: "100%",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#4BCF93",
          fontSize: 14,
          padding: "10px 15px",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          color: "#fff",
          opacity: 0.5,
          marginLeft: 15,
          lineHeight: "40px",
          "&$completed": {
            fontWeight: 300,
          },
          "&$active": {
            fontWeight: 300,
          },
          "& .MuiStepLabel-completed": {
            fontWeight: 300,
          },
        },
        active: {
          color: "#fff !important",
          opacity: 1,
        },
        completed: {
          color: "#fff !important",
          opacity: 0.5,
          fontWeight: 300,
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        lineVertical: {
          display: "none",
        },
      },
    },
    MuiStepContent: {
      styleOverrides: {
        root: {
          borderLeft: "none",
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          marginBottom: 15,
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        active: {
          color: "#1C1F23 !important",
        },
        completed: {
          color: "#fff !important",
        },
        root: {
          height: 32,
          width: 32,
          color: "#1C1F23",
          border: "1px solid #3D3D3D",
          borderRadius: "50%",
          "&$active": {
            fill: "#fff",
            border: "1px solid #3D3D3D",
            borderRadius: "50%",
            "& $text": {
              fill: "#1C1F23",
              border: "1px solid #3D3D3D",
            },
          },
        },
        text: {
          fill: "#fff",
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    MuiCalendarPicker: {
      styleOverrides: {
        root: {
          background: "#2F3438",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: "#2F3438",
          "&:hover fieldset": {
            border: "none",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          background: "#2F3438",
          "&:Mui-selected": {
            border: "1px solid #fff",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:after": {
            borderBottom: "none",
          },
          "&$focused:after": {
            borderBottom: "none",
          },
          "&$error:after": {
            borderBottom: "none",
          },
          "&:before": {
            borderBottom: "none",
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: "none",
          },
          "&$disabled:before": {
            borderBottom: "none",
          },
          "&:active:not($disabled):not($focused):not($error):before": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&$disabled": {
            color: "#3d3d3d",
          },
          textTransform: "capitalize",
          fontWeight: 500,
          fontSize: 18,
        },
        outlined: {
          "&$disabled": {
            border: "2px solid #3d3d3d",
          },
          borderWidth: "2px !important",
          borderRadius: "4px",
          padding: "1px 8px",
          fontSize: "1rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontSize: 18,
          lineHeight: "146.3%",
          fontFamily: "Roboto Mono",
          color: "#fff",
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#2F3438",
          borderRadius: 8,
          "&:hover fieldset": {
            border: "none",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: 0,
          marginBottom: 0,
          border: "1px solid #7d8c8b33",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: "#1C1F23",
          width: 615,
          maxWidth: "100%",
        },
        root: {
          height: "auto",
        },
        paperWidthSm: {
          maxWidth: 615,
          height: "auto",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: "100%",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: "42px 54px",
          "&:first-child": {
            paddingTop: "42px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          textAlign: "right",
        },
      },
    },
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          marginBottom: 0,
        },
        switchBase: {
          color: "red",
          top: 8,
          left: 8,
          "$checked$checked + &": {
            opacity: 1,
            backgroundColor: "#1C1F23",
            color: "#81FEB7",
          },
        },
        track: {
          borderRadius: "40px",
          backgroundColor: "inherit",
          border: "1px solid #fff",
          opacity: 0.5,
          "$checked$checked + &": {
            opacity: 1,
            backgroundColor: "#1C1F23",
            color: "#81FEB7",
          },
        },
        thumb: {
          width: 18,
          height: 18,
          "$checked$checked + &": {
            color: "#81FEB7",
          },
        },
        colorSecondary: {
          color: "#fff",
          "$checked$checked + &": {
            color: "#81FEB7",
          },
          "& .Mui-checked": {
            color: "#81FEB7",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          display: "none",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#2F3438",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          minHeight: 58,
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "#FFFFFF",
        },
      },
    },
    MuiTableFooter: {
      styleOverrides: {
        root: {
          minHeight: 60,
          fontSize: 16,
          fontWeight: 400,
          letterSpacing: "-0.01em",
          color: "##81FEB7",
          borderTop: "0.3px solid #3D3D3D",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          "& > *": {
            borderTop: "0.3px solid #3D3D3D",
            minHeight: 90,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "unset",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "& th:first-child, & td:first-child": {
            paddingLeft: 46,
          },
          "& th:last-child, & td:last-child": {
            paddingRight: 46,
          },
        },
      },
    },
  },
});
