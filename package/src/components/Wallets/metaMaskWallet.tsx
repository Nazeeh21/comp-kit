import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { BaseRpcRequests } from 'viem/dist/types/clients/transports/createTransport';
import { useSetWalletClient } from '../KitProvider/KitProvider';
import {
  useSetAddress,
  useSetConnectWalletError,
  useSetWalletConnecting,
  useSetWalletProvider,
} from '../KitProvider/AddressContext';
import { useCurrentChain } from '../KitProvider/ChainContext';

type EthereumProvider = { request: BaseRpcRequests['request'] };

interface useMetaMaskWalletProps {
  onClose?: () => void;
}

export const useMetaMaskWallet = ({ onClose }: useMetaMaskWalletProps) => {
  const setAddress = useSetAddress(),
    setConnecting = useSetWalletConnecting(),
    setError = useSetConnectWalletError(),
    setWalletProvider = useSetWalletProvider();
  const currentChain = useCurrentChain();

  const setWalletClient = useSetWalletClient();

  return {
    id: 1,
    name: 'MetaMask',
    connect: async () => {
      setError(undefined);

      setWalletProvider('MetaMask');

      if (typeof window === 'undefined' || !window.ethereum) {
        console.log('No window.ethereum');
        setError(new Error('No window.ethereum found'));
        return;
      }

      setConnecting(true);
      try {
        const walletClient = createWalletClient({
          chain: currentChain ?? mainnet,
          transport: custom((window.ethereum as unknown) as EthereumProvider),
        });

        setWalletClient(walletClient);

        const accounts = await walletClient.requestAddresses();

        setAddress(accounts);
        onClose?.();
      } catch (error: unknown) {
        console.log('Error while connecting MetaMask', error);
        setError(error as Error);
      } finally {
        setConnecting(false);
      }
    },
  };
};
