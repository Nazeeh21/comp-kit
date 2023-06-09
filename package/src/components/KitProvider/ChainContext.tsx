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
import { useSwitchChain } from '../../hooks/useSwitchChain';

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

  const { switchChain } = useSwitchChain();

  useEffect(() => {
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
  }, [window]);

  useEffect(() => {
    console.log('currentChain from chainContext: ', currentChain);
  }, [currentChain]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.ethereum) {
      // detect Metamask account change
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
      window.ethereum.removeListener('chainChanged', chainId => {
        console.log('detected chainChanged', chainId);
        setCurrentChain(getChain(+chainId));
      });
    };
  }, [window]);

  useEffect(() => {
    initialChain &&
      void switchChain(
        (typeof initialChain === 'number' ? initialChain : initialChain?.id) ??
          supportedChains[0].id
      );
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
        [supportedChains, initialChain, currentChain]
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
