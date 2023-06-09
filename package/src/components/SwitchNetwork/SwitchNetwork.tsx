import React from 'react';
import { Chain } from 'viem/chains';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import {
  useCurrentChain,
  useSupportedChains,
} from '../KitProvider/ChainContext';
import { Select } from '../ui/Select/Select';

export const SwitchNetworks = () => {
  const supportedChains = useSupportedChains();
  const { switchChain, switchingToChainId } = useSwitchChain();
  const currentChain = useCurrentChain();
  const [value, setValue] = React.useState<Chain>(
    currentChain ? currentChain : supportedChains[0]
  );

  const selectChangeHandler = async (value: Chain) => {
    console.log('new chain value: ', value);
    const newChainId = await switchChain(+value.id);
    console.log({ newChainId });
    !!newChainId && typeof newChainId === 'number' && setValue(value);
  };

  return (
    <Select
      variant="light"
      currentChain={value}
      switching={switchingToChainId}
      value={value}
      onChange={selectChangeHandler}
      options={supportedChains}
    />
  );
};
