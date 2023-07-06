import React, { useEffect } from 'react';
import { Chain } from 'viem/chains';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import {
  useCurrentChain,
  useSetCurrentChain,
  useSupportedChains,
} from '../KitProvider/ChainContext';
import { Select } from '../ui/Select/Select';
import {
  useIsConnected,
  useWalletProvider,
} from '../KitProvider/AddressContext';
import { getChain } from '../../utils/utils';

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

  useEffect(() => {
    console.log('currentChain from switchNetwork: ', currentChain);
  }, [currentChain]);

  const selectChangeHandler = async (value: Chain) => {
    console.log('isConnected from switchNetwork: ', isConnected);
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }
    console.log('new chain value: ', value);
    const newChainId = await switchChain(+value.id);
    console.log({ newChainId });
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
