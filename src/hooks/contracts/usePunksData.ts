import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import PunksArtifact from "../../config/web3/artifacts/PunksArtifact";
import { Punk } from "../../models/punk";

type PunkParam = {
  punks: any;
  tokenId: string;
};

const { address, abi } = PunksArtifact;

const getPunkData = async ({ punks, tokenId }: PunkParam) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    punks.methods.tokenURI(tokenId).call(),
    punks.methods.tokenDNA(tokenId).call(),
    punks.methods.ownerOf(tokenId).call(),
    punks.methods.getAccessoriesType(tokenId).call(),
    punks.methods.getAccessoriesType(tokenId).call(),
    punks.methods.getClotheColor(tokenId).call(),
    punks.methods.getClotheType(tokenId).call(),
    punks.methods.getEyeType(tokenId).call(),
    punks.methods.getEyeBrowType(tokenId).call(),
    punks.methods.getFacialHairColor(tokenId).call(),
    punks.methods.getFacialHairType(tokenId).call(),
    punks.methods.getHairColor(tokenId).call(),
    punks.methods.getHatColor(tokenId).call(),
    punks.methods.getGraphicType(tokenId).call(),
    punks.methods.getMouthType(tokenId).call(),
    punks.methods.getSkinColor(tokenId).call(),
    punks.methods.getTopType(tokenId).call(),
  ]);

  const responseMetadata = await fetch(tokenURI);
  const metadata = await responseMetadata.json();
  return {
    tokenId,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    tokenURI,
    dna,
    owner,
    ...metadata,
  };
};

// Plural
const usePunksData = ({ owner = null } = {}) => {
  const [punksList, setPunksList] = useState<Punk[]>([]);
  const { active, library, chainId } = useWeb3React();
  const [loading, setLoading] = useState(true);
  const punks = useMemo(() => {
    if (active && chainId !== null) {
      return new library.eth.Contract(abi, address[4]);
    }
  }, [active, chainId, library?.eth?.Contract]);

  const update = useCallback(async () => {
    if (punks) {
      setLoading(true);
      let tokenIds;
      if (!library.utils.isAddress(owner)) {
        const totalSupply = await punks.methods.totalSupply().call();
        //@ts-ignore
        tokenIds = new Array(Number(totalSupply)).fill().map((_, index) => index);
      } else {
        const balanceOf = await punks.methods.balanceOf(owner).call();
        const tokenIdsOfOwner = new Array(Number(balanceOf))
          //@ts-ignore
          .fill()
          .map((_, index) => punks.methods.tokenOfOwnerByIndex(owner, index).call());
        tokenIds = await Promise.all(tokenIdsOfOwner);
      }
      const punksPromise = tokenIds.map((tokenId) => getPunkData({ tokenId, punks }));

      const punksResult = await Promise.all(punksPromise);

      setPunksList(punksResult);
      setLoading(false);
    }
  }, [punks, owner, library?.utils]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punksList,
    update,
  };
};

// Singular
const usePunkData = (tokenId?: string) => {
  const { active, library, chainId, account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const [punk, setPunk] = useState<Punk | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [transferring, setTransferring] = useState<boolean>(false);
  const punks = useMemo(() => {
    if (active && chainId !== null) {
      return new library.eth.Contract(abi, address[4]);
    }
  }, [active, chainId, library?.eth?.Contract]);

  const update = useCallback(async () => {
    if (punks && tokenId != null) {
      setLoading(true);
      const toSet = await getPunkData({ punks, tokenId });
      setPunk(toSet);
      setLoading(false);
    }
  }, [punks, tokenId]);

  const transfer = (address: string, punk: Punk) => {
    setTransferring(true);
    const isAddress = library.utils.isAddress(address);
    if (!isAddress) {
      enqueueSnackbar(`Please provide a valid ethereum address`, { variant: "error" });
      setTransferring(false);
    } else {
      punks.methods
        .safeTransferFrom(punk.owner, address, punk.tokenId)
        .send({
          from: account,
        })
        .on("error", (error: any) => {
          setTransferring(false);
          enqueueSnackbar(`Transaction fail ${error.message}`, { variant: "error" });
        })
        .on("transactionHash", (txHash: string) => {
          setTransferring(false);
          enqueueSnackbar(`Transaction send ${txHash}`, { variant: "info" });
        })
        .on("receipt", () => {
          setTransferring(false);
          enqueueSnackbar(`Transaction confirm, the new owner of the NFTDapp is ${address}`, { variant: "success" });
          update();
        });
    }
  };

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    transferring,
    update,
    transfer,
  };
};

export { usePunksData, usePunkData };
