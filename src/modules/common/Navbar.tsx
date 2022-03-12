import React from "react";
import { Grid, AppBar, Toolbar, Typography, Box, useMediaQuery, Button } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import { theme } from "../../theme";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import useWallet from "../../hooks/useWallet";
import { useNavigate } from "react-router-dom";

const Header = styled(Grid)({
  padding: "28px 125px",
});

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  boxShadow: "none",
  background: theme.palette.primary.dark,
}));

const StyledToolbar = styled(Toolbar)({
  width: "100%",
  display: "flex",
  padding: 0,
  boxSizing: "border-box",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const LogoText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
});

const ToolbarContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 16,
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 0,
  },
}));

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const isMobileExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const { active, error } = useWeb3React();
  const { connect, disconnect, balance, address } = useWallet();
  const isUnsupportedChain = error instanceof UnsupportedChainIdError;

  return (
    <StyledAppBar position='sticky'>
      <StyledToolbar>
        <Header
          container
          direction={isMobileExtraSmall ? "column" : "row"}
          alignItems='center'
          wrap='wrap'
          justifyContent='space-between'>
          <Grid item>
            <Box>
              <ToolbarContainer container alignItems='center' wrap='nowrap'>
                <Grid item onClick={() => navigate("/")}>
                  <Box paddingLeft='10px' display='flex'>
                    <LogoText color='textPrimary'>NFT Dapp</LogoText>
                  </Box>
                </Grid>
              </ToolbarContainer>
            </Box>
          </Grid>
          <Grid item>
            {active ? (
              <Grid container style={{ gap: 15, alignItems: "center" }}>
                <Typography variant='subtitle2' color='inherit'>
                  {address}
                </Typography>
                <Typography variant='subtitle2' color='inherit'>
                  ~{balance.toFixed(4)} Eth Ξ
                </Typography>
                <Button variant='contained' color='secondary' onClick={disconnect}>
                  Disconnect
                </Button>
              </Grid>
            ) : (
              <Button variant='contained' color='secondary' onClick={connect} disabled={isUnsupportedChain}>
                {isUnsupportedChain ? "Unsupported Network" : " Connect Wallet"}
              </Button>
            )}
          </Grid>
        </Header>
      </StyledToolbar>
    </StyledAppBar>
  );
};
