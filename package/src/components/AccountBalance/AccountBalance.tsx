import { Address } from 'viem';
import { Input } from '../Input/Input';
import React from 'react';

export const AccountBalance = () => {
  const [address, setAddress] = React.useState<Address>();
  return (
    <Input
      value={address}
      onChange={e => setAddress(e.target.value as Address)}
    />
  );
};
