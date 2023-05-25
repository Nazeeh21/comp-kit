import React, { useMemo } from 'react';
import { Button } from '../Button/Button';
import { useClient } from '../KitProvider/KitProvider';
import { useAddress } from '../../hooks/useAddress';

export const ConnectButton = () => {
  const { walletClient } = useClient();
  const { setAddress } = useAddress();

  if (!walletClient) {
    return;
  }

  const clickHandler = () =>
    useMemo(async () => {
      const accounts = await walletClient.requestAddresses();
      console.log(accounts);
      setAddress(accounts);
      return;
    }, [walletClient]);

  return <Button onClick={clickHandler}>Connect Wallet</Button>;
};
