import React from 'react';
import { useSupportedChains } from '../KitProvider/ChainContext';
import { useWalletClient } from '../KitProvider/KitProvider';
import { Select } from '../Select/Select';

export const SwitchNetworks = () => {
  const supportedChains = useSupportedChains();

  const walletClient = useWalletClient();

  const selectChangeHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    try {
      await walletClient?.switchChain({ id: +e.target.value });
    } catch (error) {
      console.log('Error while adding chain: ', error);
    }
  };

  return (
    <Select onChange={selectChangeHandler}>
      {supportedChains.map(chain => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </Select>
  );
};
