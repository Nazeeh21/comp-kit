import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Chain } from 'viem';
import { useSwitchChain } from '../../hooks/useSwitchChain';
import { getChain } from '../../utils/utils';
import { usePublicClient, useWalletClient } from './KitProvider';

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
  setCurrentChain: () => undefined,
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
  const publicClient = usePublicClient();

  const { switchChain, switchingToChainId } = useSwitchChain();

  useEffect(() => {
    console.log({ currentChain });
  }, [currentChain]);

  useEffect(() => {
    // detect on which chain user is whenever user reloads
    void (async () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        console.log('chainId from users metamask: ', chainId);
        chainId && setCurrentChain(getChain(+chainId));
      }
    })();
  }, []);

  useEffect(() => {
    // detect Metamask chain change
    if (typeof window !== 'undefined' && window?.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('detected chainChanged', chainId);
        setCurrentChain(getChain(+chainId));
      });
    } else {
      const fetchChain = async () => {
        const block = await publicClient?.[
          supportedChains[0].name
        ]?.getChainId();
        setCurrentChain(getChain(block || 1));
        return;
      };
      void fetchChain();
    }
    return () => {
      // @ts-expect-error trying to remove eventLister on window.ethereum object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window?.ethereum?.removeListener('chainChanged', chainId => {
        console.log('detected chainChanged', chainId);
        setCurrentChain(getChain(+chainId));
      });
    };
  }, [publicClient, supportedChains]);

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
          switchingToChainId,
          setCurrentChain,
        }),
        [
          supportedChains,
          initialChain,
          currentChain,
          setCurrentChain,
          switchingToChainId,
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

export const useSetCurrentChain = () =>
  useContext(ChainContext).setCurrentChain;

export const useCurrentChain = () => useContext(ChainContext).currentChain;

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
