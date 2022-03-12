import { Alert, CircularProgress, Container, Grid } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { usePunksData } from "../../../../hooks/contracts/usePunksData";
import { PunkCard } from "../../components/PunkCard";

export const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const { active } = useWeb3React();
  const { punksList, loading } = usePunksData({
    owner: null,
  });

  return (
    <Container>
      <Grid container justifyContent='center'>
        {active ? (
          <>
            {loading && <CircularProgress color='secondary' />}
            <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              {punksList.map((elem) => (
                <Grid
                  item
                  xs={6}
                  md={4}
                  lg={3}
                  xl={2}
                  key={elem.tokenId}
                  onClick={() => navigate(`/punk/${elem.tokenId}`)}>
                  <PunkCard punk={elem} isDetails={false} />
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          <Alert severity='info'>Connect your wallet to enjoy the app</Alert>
        )}
      </Grid>
    </Container>
  );
};
