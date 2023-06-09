import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Chain } from 'viem';
import { usePublicClient, useWalletClient } from './KitProvider';
import { getChain } from '../../utils/utils';

export interface ChainContextProps {
  supportedChains: Chain[];
  initialChain?: Chain | number;
  currentChain?: Chain;
}

const ChainContext = createContext<ChainContextProps>({
  supportedChains: [],
  initialChain: undefined,
  currentChain: undefined,
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
  const [currentChain, setCurrentChain] = useState<Chain | undefined>();
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchChain = async () => {
      const block = await publicClient?.[supportedChains[0].name]?.getChainId();
      setCurrentChain(getChain(block || 1));
      return;
    };
    void fetchChain();
  }, [publicClient]);

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
          currentChain,
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

export const useCurrentChain = () => useContext(ChainContext).currentChain;
