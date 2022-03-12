import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { HomeRouter } from "./modules/home/router";
import { Navbar } from "./modules/common/Navbar";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "./config";
import { SnackbarProvider } from "notistack";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  success: {
    backgroundColor: "#4BCF93 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
  error: {
    backgroundColor: "#ED254E !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
  info: {
    backgroundColor: "#3866F9 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1,
  },
});

const App: React.FC = () => {
  const classes = styles();
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantInfo: classes.info,
        }}>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/*' element={<HomeRouter />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Router>
        </Web3ReactProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
