import { Button, Container, Grid, styled, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePunks from "../../../../hooks/contracts/usePunks";
import useWallet from "../../../../hooks/useWallet";

const Image = styled("img")({
  width: 264,
  height: 280,
});

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { active } = useWeb3React();
  const { address } = useWallet();
  const { getPunkData, mint, newPunk, totalSupply } = usePunks();

  useEffect(() => {
    getPunkData();
  }, [getPunkData]);

  const handleMint = () => {
    mint();
    getPunkData();
  };

  return (
    <Container>
      <Grid container justifyContent={"center"} alignItems={"center"} py={15}>
        <Grid item md={8}>
          <Typography color={"textPrimary"} variant='body1'>
            NFT Dapp is a collection of random avatars whose metadata is stored on-chain. They have unique
            characteristics, and there are only 10,000 in existence.
          </Typography>
          <br />
          <Typography color={"textPrimary"} variant='body1'>
            Each NFT Dapp spawns sequentially based on your address; use the preview to find out what your NFT Dapp
            would be if you minting right now
          </Typography>

          <Grid container justifyContent='center' style={{ gap: 20 }} py={12}>
            <Button variant='contained' color='secondary' onClick={handleMint}>
              Mint Your Punk
            </Button>
            <Button variant='outlined' color='secondary' onClick={() => navigate("/punks")}>
              Gallery
            </Button>
          </Grid>
        </Grid>
        <Grid item md={4}>
          <Grid container justifyContent='center' alignItems='center' style={{ gap: 15 }} flexDirection='column'>
            <Image src={active ? newPunk : "https://avataaars.io/"} />
            {active && (
              <>
                <Grid container justifyContent='center' alignItems='center' style={{ gap: 15 }}>
                  <Typography color='textPrimary'>Next Id: </Typography>
                  <Typography color='secondary'>{totalSupply}</Typography>
                </Grid>
                <Grid container justifyContent='center' alignItems='center' style={{ gap: 15 }}>
                  <Typography color='textPrimary'>Address: </Typography>
                  <Typography color='secondary'>{address}</Typography>
                </Grid>

                <Button variant='outlined' color='secondary'>
                  Update
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};
