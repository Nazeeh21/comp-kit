import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Chain } from 'viem';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import { useWalletClient } from './KitProvider';

export interface ChainContextProps {
  supportedChains: Chain[];
  initialChain?: Chain;
  currentChain?: Chain;
  setCurrentChain?: React.Dispatch<React.SetStateAction<Chain | undefined>>;
  switchingToChainId?: number | null;
}

const ChainContext = createContext<ChainContextProps>({
  supportedChains: [],
  initialChain: undefined,
  currentChain: undefined,
  setCurrentChain: undefined,
  switchingToChainId: undefined,
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

  const { switchChain, switchingToChainId } = useSwitchChain();

  useEffect(() => {
    console.log('initialChain from chainContext: ', initialChain);
    console.log('switching chain');
    initialChain !== undefined &&
      void switchChain(
        typeof initialChain === 'number' ? initialChain : initialChain?.id
      );
  }, [initialChain, walletClient]);

  return (
    <ChainContext.Provider
      value={useMemo(
        () => ({
          supportedChains,
          initialChain,
          currentChain,
          setCurrentChain,
          switchingToChainId,
        }),
        [
          supportedChains,
          initialChain,
          currentChain,
          switchingToChainId,
          setCurrentChain,
        ]
      )}
    >
      {children}
    </ChainContext.Provider>
  );
};

export const useSupportedChains = () =>
  useContext(ChainContext).supportedChains;

export const useInitialChain = () => useContext(ChainContext).initialChain;

export const useCurrentChain = () => useContext(ChainContext).currentChain;

export const useSetCurrentChain = () =>
  useContext(ChainContext).setCurrentChain;

export const useChain = () => {
  const { currentChain, supportedChains } = useContext(ChainContext);
  return useMemo(
    () => ({
      currentChain,
      supportedChains,
    }),
    [currentChain, supportedChains]
  );
};
