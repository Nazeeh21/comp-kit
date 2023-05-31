import React, {
  ReactNode,
  useContext,
  useMemo,
  createContext,
  useEffect,
  useState,
} from 'react';
import {
  Transport,
  createPublicClient,
  createWalletClient,
  custom,
} from 'viem';
import { Chain } from 'viem/chains';

export interface KitProviderProps {
  chains: Chain;
  supportedChains?: Chain[];
  initialChain?: Chain | number | undefined;
  children: ReactNode;
  transport: Transport;
}
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
  transport,
  supportedChains = [chains],
  initialChain,
  children,
}: KitProviderProps) => {
  const [walletClient, setWalletClient] = useState<
    ReturnType<typeof createWalletClient> | undefined
  >();

  useEffect(() => {
    if (typeof transport === typeof custom) {
      const client = createWalletClient({
        chain: chains,
        transport,
      });
      setWalletClient(client);
    } else {
      setWalletClient(undefined);
    }
  }, [transport]);

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
