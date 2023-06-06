import React, { useCallback } from 'react';
import { useAddress } from '../../hooks/useAddress';
import { Button } from '../ui/Button/Button';
import { useWalletClient } from '../KitProvider/KitProvider';

export const ConnectButton = () => {
  const walletClient = useWalletClient();
  const { setAddress } = useAddress();

  const clickHandler = useCallback(async () => {
    if (!walletClient) {
      return;
    }
    const accounts = await walletClient.requestAddresses();
    console.log(accounts);
    setAddress(accounts);
  }, [walletClient, setAddress]);

  return <Button onClick={clickHandler}>Connect Wallet</Button>;
};
