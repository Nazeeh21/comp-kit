import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { Chain } from 'viem';
import { useWalletClient } from './KitProvider';

export interface ChainContextProps {
  supportedChains: Chain[];
  initialChain?: Chain | number;
}

const ChainContext = createContext<ChainContextProps>({
  supportedChains: [],
  initialChain: undefined,
});

interface ChainContextProviderProps extends ChainContextProps {
  children: React.ReactNode;
}

export const ChainContextProvider = ({
  supportedChains,
  initialChain,
  children,
}: ChainContextProviderProps) => {
  const walletClient = useWalletClient();

  useEffect(() => {
    const switchChain = async () => {
      await walletClient?.switchChain({
        id:
          (typeof initialChain === 'number'
            ? initialChain
            : initialChain?.id) ?? supportedChains[0].id,
      });
    };
    initialChain && void switchChain();
  }, [initialChain, walletClient]);

  return (
    <ChainContext.Provider
      value={useMemo(
        () => ({
          supportedChains,
          initialChain:
            typeof initialChain === 'number' ? initialChain : initialChain?.id,
        }),
        [supportedChains, initialChain]
      )}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useSupportedChains = () =>
  useContext(ChainContext).supportedChains;

export const useInitialChainId = () => useContext(ChainContext).initialChain;
