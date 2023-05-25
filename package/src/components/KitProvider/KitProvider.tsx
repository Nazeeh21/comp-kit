import React, { ReactNode, useContext, useMemo } from 'react';
import { CustomTransport, createPublicClient, createWalletClient } from 'viem';
import { Chain } from 'viem/chains';

export interface KitProviderProps {
  chains: Chain;
  children: ReactNode;
  transport: CustomTransport;
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
  transport,
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

// export const useWalletClient = ():
//   | ReturnType<typeof createWalletClient>
//   | undefined => useContext(ClientContext).walletClient;

// export const usePublicClient = ():
//   | ReturnType<typeof createPublicClient>
//   | undefined => useContext(ClientContext).publicClient;

export const useClient = () => useContext(ClientContext);
