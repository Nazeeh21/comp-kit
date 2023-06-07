import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPublicClient, createWalletClient, http } from 'viem';
import { Chain } from 'viem/chains';
import { ChainContextProvider } from './ChainContext';
import { AddressContextProvider } from './AddressContext';

export interface KitProviderProps {
  supportedChains: Chain[];
  initialChain: Chain | number | undefined;
  children: ReactNode;
}

export const ClientContext = createContext<{
  walletClient: ReturnType<typeof createWalletClient> | undefined;
  publicClient: ReturnType<typeof createPublicClient> | undefined;
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

  // useEffect(() => {
  //   if (typeof transport === typeof custom) {
  //     const client = createWalletClient({
  //       chain: chains,
  //       transport,
  //     });
  //     setWalletClient(client);
  //   } else {
  //     setWalletClient(undefined);
  //   }
  // }, [transport]);

  const publicClient = createPublicClient({
    chain: supportedChains[0],
    transport: http(),
  });

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
        initialChainId={initialChain}
      >
        <AddressContextProvider>{children}</AddressContextProvider>
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

export const useSetWalletClient = (): React.Dispatch<
  React.SetStateAction<ReturnType<typeof createWalletClient> | undefined>
> => useContext(ClientContext).setWalletClient;
