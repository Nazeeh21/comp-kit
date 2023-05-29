import { useState } from 'react';
import { Address } from 'viem';

export const useAddress = () => {
  const [address, setAddress] = useState<Address[] | undefined>();

  return {
    address,
    setAddress,
  };
};
