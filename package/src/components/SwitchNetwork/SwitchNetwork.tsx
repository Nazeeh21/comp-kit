import React from 'react';
import { Chain } from 'viem/chains';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import { getChain } from '../../utils/utils';
import {
  useIsConnected,
  useWalletProvider,
} from '../KitProvider/AddressContext';
import {
  useCurrentChain,
  useSetCurrentChain,
  useSupportedChains,
} from '../KitProvider/ChainContext';
import { Select } from '../ui/Select/Select';

export const SwitchNetworks = () => {
  const supportedChains = useSupportedChains();
  const { switchChain, switchingToChainId } = useSwitchChain();
  const currentChain = useCurrentChain();
  const setCurrentChain = useSetCurrentChain();
  const isConnected = useIsConnected();
  const [value, setValue] = React.useState<Chain>(
    currentChain ?? supportedChains[0]
  );

  const walletProvider = useWalletProvider();

  const selectChangeHandler = async (value: Chain) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    const newChainId = await switchChain(+value.id);

    !!newChainId && typeof newChainId === 'number' && setValue(value);
    walletProvider === 'WalletConnect' &&
      setCurrentChain?.(getChain(+newChainId));
  };

  return (
    <Select
      variant="light"
      currentChain={currentChain}
      switching={switchingToChainId}
      value={value}
      onChange={selectChangeHandler}
      options={supportedChains}
    />
  );
};
