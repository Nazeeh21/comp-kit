import React, { ReactNode, useContext, useMemo } from 'react';
import { Transport, createPublicClient, createWalletClient, http } from 'viem';
import { Chain } from 'viem/chains';

export interface KitProviderProps {
  chains: Chain;
  supportedChains?: Chain[];
  initialChain?: Chain | number;
  children: ReactNode;
  transport?: Transport;
}

import { createContext } from 'react';
import { ChainContextProvider } from './ChainContext';

export const ClientContext = createContext<{
  walletClient: ReturnType<typeof createWalletClient> | undefined;
  publicClient: ReturnType<typeof createPublicClient> | undefined;
}>({
  walletClient: undefined,
  publicClient: undefined,
});

export const KitProvider = ({
  chains,
  transport = http(),
  supportedChains = [chains],
  initialChain = chains,
  children,
}: KitProviderProps) => {
  const walletClient = createWalletClient({
    chain: chains,
    transport,
  });

  const publicClient = createPublicClient({
    chain: chains,
    transport,
  });

  return (
    <ClientContext.Provider
      value={useMemo(
        () => ({
          walletClient,
          publicClient,
        }),
        [walletClient, publicClient]
      )}
    >
      <ChainContextProvider
        supportedChains={supportedChains}
        initialChainId={initialChain}
      >
        {children}
      </ChainContextProvider>
    </ClientContext.Provider>
  );
};

export const usePublicClient = ():
  | ReturnType<typeof createPublicClient>
  | undefined => useContext(ClientContext).publicClient;

export const useWalletClient = ():
  | ReturnType<typeof createWalletClient>
  | undefined => useContext(ClientContext).walletClient;
