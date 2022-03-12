import { Grid, styled, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Punk } from "../../../models/punk";

type PunkCardProps = {
  punk: Punk;
  isDetails: boolean;
};

const Image = styled("img")(({ isDetails }: { isDetails: boolean }) => ({
  width: isDetails ? 196 : 166,
  height: isDetails ? 180 : 150,
}));

const PunkCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));

export const PunkCard: React.FC<PunkCardProps> = ({ punk, isDetails }) => {
  const navigate = useNavigate();
  return (
    <PunkCardContainer container py={isDetails ? 4.5 : 2.8} style={{ gap: 15 }}>
      <Grid item>
        <Image src={punk.image} isDetails={isDetails} />
      </Grid>
      <Grid item style={{ cursor: "pointer" }} onClick={() => navigate("/explorer/communities/1")}>
        <Typography variant={"body1"} color={"textPrimary"}>
          {punk.name.replace("Platzi", "NFT")}
        </Typography>
      </Grid>
    </PunkCardContainer>
  );
};
