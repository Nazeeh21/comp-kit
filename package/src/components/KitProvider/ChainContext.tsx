import React, { createContext, useContext, useMemo } from 'react';
import { Chain } from 'viem';

export interface ChainContextProps {
  supportedChains: Chain[];
  initialChainId?: Chain | number;
}

const ChainContext = createContext<ChainContextProps>({
  supportedChains: [],
  initialChainId: undefined,
});

interface ChainContextProviderProps extends ChainContextProps {
  children: React.ReactNode;
}

export const ChainContextProvider = ({
  supportedChains,
  initialChainId,
  children,
}: ChainContextProviderProps) => {
  return (
    <ChainContext.Provider
      value={useMemo(
        () => ({
          supportedChains,
          initialChainId:
            typeof initialChainId === 'number'
              ? initialChainId
              : initialChainId?.id,
        }),
        [supportedChains, initialChainId]
      )}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useSupportedChains = () =>
  useContext(ChainContext).supportedChains;

export const useInitialChainId = () => useContext(ChainContext).initialChainId;
