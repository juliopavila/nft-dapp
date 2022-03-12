import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { connector } from "../config";
import useTruncatedAddress from "./useTruncateAddress";

const useWallet = () => {
  const [balance, setBalance] = useState<number>(0);
  const { active, activate, deactivate, account, library } = useWeb3React();
  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem("previouslyConnected", "true");
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem("previouslyConnected");
  };

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance(toSet / 1e18);
  }, [library?.eth, account]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  useEffect(() => {
    if (localStorage.getItem("previouslyConnected") === "true") connect();
  }, [connect]);

  const address = useTruncatedAddress(account || "");

  return { balance, disconnect, connect, address };
};

export default useWallet;
