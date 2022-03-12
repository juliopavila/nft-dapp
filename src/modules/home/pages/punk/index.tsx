import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePunkData } from "../../../../hooks/contracts/usePunksData";
import { theme } from "../../../../theme";
import { PunkCard } from "../../components/PunkCard";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: theme.palette.primary.main,
  boxShadow: 24,
  p: 4,
};

export const Punk: React.FC = () => {
  const navigation = useNavigate();
  const { account, library } = useWeb3React();
  const { tokenId } = useParams();
  const { loading, punk, transferring, transfer } = usePunkData(tokenId);
  const [open, setOpen] = useState<boolean>(false);
  const [invalidAddress, setInvalidAddress] = useState<boolean>(false);
  const [newAddress, setNewAddress] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddress = (address: string) => {
    if (library && address) {
      const isAddress = library.utils.isAddress(address);
      setNewAddress(address);
      if (isAddress) {
        setInvalidAddress(false);
      } else {
        setInvalidAddress(true);
      }
    }
  };

  console.log(punk);
  console.log("loading", loading);
  return (
    <Container>
      <Grid container>
        <Button variant='outlined' color='secondary' size='small' onClick={() => navigation(-1)}>
          Go back
        </Button>
      </Grid>
      <Grid container py={10}>
        <Grid item sm={12} md={3}>
          <Grid container justifyContent='center' alignItems='center' style={{ gap: 20 }}>
            {punk && <PunkCard punk={punk} isDetails />}
            {punk && punk.owner === account && (
              <Button variant='contained' color='secondary' onClick={handleOpen}>
                Transfer
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item sm={12} md={9} px={8}>
          {punk && (
            <Grid container style={{ gap: 20 }}>
              <Typography variant='h1' color='textPrimary'>
                {punk.name.replace("Platzi", "NFT")}
              </Typography>
              <Grid container style={{ gap: 15 }} alignItems='center'>
                <Typography variant='body1' color='textPrimary'>
                  DNA:
                </Typography>
                <Typography variant='h6' color='secondary'>
                  {punk.dna}
                </Typography>
              </Grid>
              <Grid container style={{ gap: 15 }} alignItems='center'>
                <Typography variant='body1' color='textPrimary'>
                  Owner:
                </Typography>
                <Typography variant='h6' color='secondary'>
                  {punk.owner}
                </Typography>
              </Grid>

              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell> Value </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(punk.attributes).map(([key, value]) => (
                    <TableRow key={punk.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {key}
                      </TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          )}
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          {transferring ? (
            <Grid container justifyContent={"center"} alignItems={"center"}>
              <CircularProgress color='secondary' />
            </Grid>
          ) : (
            <Grid container style={{ gap: 15 }}>
              <Grid item>
                <Typography variant='subtitle2' color='textSecondary'>
                  Wallet to transfer
                </Typography>
              </Grid>
              <Grid item sm={12}>
                <TextField
                  placeholder='Eth address'
                  size='small'
                  value={newAddress}
                  onChange={({ target }) => handleAddress(target.value)}
                />
              </Grid>
              {invalidAddress && (
                <Grid item>
                  <Alert severity='error'>Please provide a valid ethereum address</Alert>
                </Grid>
              )}
              {!invalidAddress && newAddress && punk && (
                <Grid item>
                  <Button
                    variant='contained'
                    color='secondary'
                    size='small'
                    onClick={() => {
                      transfer(newAddress, punk);
                      handleClose();
                    }}>
                    Transfer
                  </Button>
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Modal>
    </Container>
  );
};
