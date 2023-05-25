import React, { ReactNode, useContext, useMemo } from 'react';
import { Transport, createPublicClient, createWalletClient, http } from 'viem';
import { Chain } from 'viem/chains';

export interface KitProviderProps {
  chains: Chain;
  children: ReactNode;
  transport?: Transport;
}

import { createContext } from 'react';

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
        []
      )}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => useContext(ClientContext);
