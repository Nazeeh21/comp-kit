import React from 'react';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import { useCurrentChain } from '../../utils/utils';
import { useSupportedChains } from '../KitProvider/ChainContext';
import { Select } from '../Select/Select';

export const SwitchNetworks = () => {
  const supportedChains = useSupportedChains();
  const { switchChain } = useSwitchChain();
  const currentChain = useCurrentChain();
  const [value, setValue] = React.useState<number>(
    currentChain ? currentChain.id : supportedChains[0].id
  );

  const selectChangeHandler = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    console.log(e.target.value);
    const newChainId = await switchChain(+e.target.value);
    console.log({ newChainId });
    !!newChainId && typeof newChainId === 'number' && setValue(newChainId);
  };

  return (
    <Select value={value} onChange={selectChangeHandler}>
      {supportedChains.map(chain => (
        <option key={chain.id} value={chain.id}>
          {chain.name}
        </option>
      ))}
    </Select>
  );
};
