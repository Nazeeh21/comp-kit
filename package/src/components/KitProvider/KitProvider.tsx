import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPublicClient, createWalletClient, http } from 'viem';
import { Chain, mainnet } from 'viem/chains';
import { ChainContextProvider } from './ChainContext';
import { AddressContextProvider } from './AddressContext';

export interface KitProviderProps {
  supportedChains: Chain[];
  initialChain: Chain;
  children: ReactNode;
}

export const ClientContext = createContext<{
  walletClient: ReturnType<typeof createWalletClient> | undefined;
  publicClient:
    | Record<string, ReturnType<typeof createPublicClient>>
    | undefined;
  setWalletClient: React.Dispatch<
    React.SetStateAction<ReturnType<typeof createWalletClient> | undefined>
  >;
}>({
  walletClient: undefined,
  publicClient: undefined,
  setWalletClient: () => {
    return;
  },
});

export const KitProvider = ({
  supportedChains,
  initialChain,
  children,
}: KitProviderProps) => {
  const [walletClient, setWalletClient] = useState<
    ReturnType<typeof createWalletClient> | undefined
  >();

  const [publicClient, setPublicClient] = useState<
    Record<string, ReturnType<typeof createPublicClient>> | undefined
  >();

  useEffect(() => {
    const tempPublicClient: Record<
      string,
      ReturnType<typeof createPublicClient>
    > = {};
    [...supportedChains, initialChain && initialChain].forEach(chain => {
      const client = createPublicClient({
        chain: chain ?? mainnet,
        transport: http(),
      });
      tempPublicClient[chain.name] = client;
    });
    setPublicClient(tempPublicClient);
  }, []);

  return (
    <ClientContext.Provider
      value={useMemo(
        () => ({
          walletClient,
          publicClient,
          setWalletClient,
        }),
        [walletClient, publicClient]
      )}
    >
      <ChainContextProvider
        supportedChains={supportedChains}
        initialChain={initialChain}
      >
        <AddressContextProvider>{children}</AddressContextProvider>
      </ChainContextProvider>
    </ClientContext.Provider>
  );
};

export const usePublicClient = ():
  | Record<string, ReturnType<typeof createPublicClient>>
  | undefined => useContext(ClientContext).publicClient;

export const useWalletClient = ():
  | ReturnType<typeof createWalletClient>
  | undefined => useContext(ClientContext).walletClient;

export const useSetWalletClient = (): React.Dispatch<
  React.SetStateAction<ReturnType<typeof createWalletClient> | undefined>
> => useContext(ClientContext).setWalletClient;
