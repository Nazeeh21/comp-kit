import React, { useState } from 'react';
import { Address, getAddress } from 'viem';
import { useBalance } from '../../hooks/useBalance';
import { Input } from '../Input/Input';

export const AccountBalance = () => {
  const [address, setAddress] = React.useState<Address | undefined>();
  const [inValid, setInvalid] = useState<boolean>(false);

  const { getBalance, etherBalance, loading, balance, error } = useBalance();

  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value as Address;
    setAddress(newValue);
    if (e.target.value === '') {
      setInvalid(false);
      return;
    }
    try {
      const checksummedAddress = getAddress(newValue, 30);
      if (checksummedAddress) {
        await getBalance({ address: newValue });
      }
      setInvalid(false);
    } catch (error) {
      console.log('invalid address ', { error });
      setInvalid(true);
    }
  };

  return (
    <div>
      <Input value={address} onChange={onChangeHandler} />
      {balance !== undefined && (
        <div>Balance in gwei: {balance.toString()}</div>
      )}
      {etherBalance !== undefined && (
        <div>Balance in ethers: {etherBalance}</div>
      )}
      {inValid && <div>Invalid address</div>}
      {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>}
    </div>
  );
};
