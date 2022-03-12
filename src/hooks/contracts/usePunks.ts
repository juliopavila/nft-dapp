import { useCallback, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import PunksArtifact from "../../config/web3/artifacts/PunksArtifact";
import { useSnackbar } from "notistack";

const { address, abi } = PunksArtifact;

const usePunks = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { active, library, chainId, account } = useWeb3React();
  const [newPunk, setNewPunk] = useState<string | undefined>(undefined);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const punks = useMemo(() => {
    if (active && chainId !== null) {
      return new library.eth.Contract(abi, address[4]);
    }
  }, [active, chainId, library?.eth?.Contract]);

  const getPunkData = useCallback(async () => {
    if (punks) {
      const totalSupply = await punks.methods.totalSupply().call();
      setTotalSupply(totalSupply);
      const dnaPreview = await punks.methods.deterministicPseudoRandomDNA(totalSupply, account).call();
      const image = await punks.methods.imageByDNA(dnaPreview).call();
      setNewPunk(image);
    }
  }, [punks, account]);

  const mint = () => {
    setIsMinting(true);
    punks.methods
      .mint()
      .send({
        from: account,
      })
      .on("transactionHash", (txHash: string) => {
        enqueueSnackbar(`Transaction send ${txHash}`, { variant: "info" });
      })
      .on("receipt", () => {
        setIsMinting(false);
        enqueueSnackbar(`Transaction confirm`, { variant: "success" });
      })
      .on("error", (error: any) => {
        setIsMinting(false);
        enqueueSnackbar(`Transaction fail ${error.message}`, { variant: "error" });
      });
  };

  return { punks, newPunk, totalSupply, isMinting, getPunkData, mint };
};

export default usePunks;
