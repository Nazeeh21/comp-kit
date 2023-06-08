import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import {
  useSetAddress,
  useSetConnectWalletError,
  useSetWalletConnecting,
  useSetWalletProvider,
} from '../KitProvider/AddressContext';
import { useSetWalletClient } from '../KitProvider/KitProvider';
import { useCurrentChain } from '../../utils/utils';
import { useSupportedChains } from '../KitProvider/ChainContext';

const projectId = '5a13f1a5297da2cd768519079890e4fe';

interface useWalletConnectWalletProps {
  onClose?: () => void;
}

export const useWalletConnectWallet = ({
  onClose,
}: useWalletConnectWalletProps) => {
  const setWalletClient = useSetWalletClient();

  const setAddress = useSetAddress(),
    setConnecting = useSetWalletConnecting(),
    setError = useSetConnectWalletError(),
    setWalletProvider = useSetWalletProvider();

  const supportedChains = useSupportedChains();

  const currentChain = useCurrentChain();

  return {
    id: 1,
    name: 'WalletConnect',
    connect: async () => {
      setConnecting(true);
      setWalletProvider('WalletConnect');
      try {
        const provider = await EthereumProvider.init({
          chains: supportedChains.map(chain => chain.id),
          projectId,
          events: ['chainChanged', 'accountsChanged'],
          methods: ['eth_requestAccounts'],
          rpcMap: {
            1: 'https://cloudflare-eth.com',
          },
          showQrModal: true,
        });

        provider.on('display_uri', (uri: string) => {
          console.log('URI: ', uri);
        });

        await provider.connect();

        const walletClient = createWalletClient({
          chain: currentChain ?? mainnet,
          transport: custom(provider),
        });

        setWalletClient(walletClient);

        if (!walletClient) {
          return;
        }
        const accounts = await walletClient.requestAddresses();
        console.log(accounts);
        setAddress(accounts);
        onClose?.();
      } catch (error: unknown) {
        console.log('Error while connecting WalletConnect', error);
        setError(error as Error);
      } finally {
        setConnecting(false);
      }
    },
  };
};
