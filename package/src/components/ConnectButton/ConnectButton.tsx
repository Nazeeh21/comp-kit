import React, { useCallback } from 'react';
import { useAddress } from '../../hooks/useAddress';
import { Button } from '../Button/Button';
import { useClient } from '../KitProvider/KitProvider';

export const ConnectButton = () => {
  const { walletClient } = useClient();
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
