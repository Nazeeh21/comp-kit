import React, { ReactNode, useEffect } from 'react';
import { useSetCurrentChain } from '../../KitProvider/ChainContext';
import { getChain, getPrevAccount, getPrevWallet } from '../../../utils/utils';
import {
  useSetWalletClient,
  useWalletClient,
} from '../../KitProvider/KitProvider';
import {
  useSetAddress,
  useSetWalletProvider,
  useWalletProvider,
} from '../../KitProvider/AddressContext';
import { Address, createWalletClient, custom } from 'viem';
import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { mainnet } from 'viem/chains';

interface MetaMaskFuncProps {
  children: ReactNode;
}

export const MetaMaskFunc: React.FC<MetaMaskFuncProps> = ({ children }) => {
  const setCurrentChain = useSetCurrentChain();
  const walletClient = useWalletClient();
  const walletProvider = useWalletProvider();
  const setAddress = useSetAddress();
  const setWalletProvider = useSetWalletProvider();
  const setWalletClient = useSetWalletClient();

  useEffect(() => {
    // add listeners to listen account changes in metamask
    if (
      walletProvider === 'MetaMask' &&
      typeof window !== 'undefined' &&
      window?.ethereum
    ) {
      window.ethereum.on('accountsChanged', accounts => {
        if (accounts) {
          if (accounts.length > 0) {
            setAddress((accounts as unknown) as Address[]);
          } else if (accounts.length === 0) {
            setAddress(undefined);
          }
        }
      });
    }
    return () => {
      // @ts-expect-error trying to remove eventLister on window.ethereum object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window?.ethereum?.removeListener('accountsChanged', accounts => {
        console.log('accountsChanges', accounts);
      });
    };
  }, [walletProvider]);

  useEffect(() => {
    // persists address on reload if wallet is metamask
    if (walletProvider === 'MetaMask') {
      void (async () => {
        const accounts = await walletClient?.getAddresses();

        if (accounts && accounts.length > 0) {
          setAddress(accounts);
        } else {
          setAddress(undefined);
        }
      })();
    }
  }, [walletClient, walletProvider]);

  useEffect(() => {
    if (getPrevWallet() === 'WalletConnect') {
      const data = getPrevAccount();
      if (data) {
        setAddress(data.data.accounts);
        setWalletProvider('WalletConnect');
      }
    } else if (
      // persists walletClient on reload if wallet is metamask
      getPrevWallet() === 'MetaMask' &&
      typeof window !== 'undefined' &&
      window?.ethereum
    ) {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom((window.ethereum as unknown) as EthereumProvider),
      });
      setWalletClient(walletClient);
      setWalletProvider('MetaMask');
    }
  }, []);

  useEffect(() => {
    // detect on which chain user is whenever user reloads
    void (async () => {
      if (
        walletProvider === 'MetaMask' &&
        typeof window !== 'undefined' &&
        window.ethereum
      ) {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const chainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        chainId && setCurrentChain?.(getChain(+chainId));
      }
    })();
  }, [walletProvider]);

  useEffect(() => {
    if (
      walletProvider === 'MetaMask' &&
      typeof window !== 'undefined' &&
      window?.ethereum
    ) {
      // detect Metamask chain change
      window.ethereum.on('chainChanged', (chainId: string) => {
        console.log('detected chainChanged', chainId);
        setCurrentChain?.(getChain(+chainId));
      });
    } else {
      const fetchChain = async () => {
        const block = await walletClient?.getChainId();
        setCurrentChain?.(getChain(block || 1));
        return;
      };
      void fetchChain();
    }
    return () => {
      // @ts-expect-error trying to remove eventLister on window.ethereum object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window?.ethereum?.removeListener('chainChanged', chainId => {
        setCurrentChain?.(getChain(+chainId));
      });
    };
  }, [walletClient]);

  return <>{children}</>;
};
