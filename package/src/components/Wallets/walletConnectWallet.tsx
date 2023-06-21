import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { getChain, storePrevAccount, storePrevWallet } from '../../utils/utils';
import {
  useSetAddress,
  useSetConnectWalletError,
  useSetWalletConnecting,
  useSetWalletProvider,
} from '../KitProvider/AddressContext';
import {
  useCurrentChain,
  useSetCurrentChain,
  useSupportedChains,
} from '../KitProvider/ChainContext';
import { useProjectId, useSetWalletClient } from '../KitProvider/KitProvider';

interface useWalletConnectWalletProps {
  onClose?: () => void;
}

export const useWalletConnectWallet = ({
  onClose,
}: useWalletConnectWalletProps) => {
  const setWalletClient = useSetWalletClient();
  const projectId = useProjectId();

  const setAddress = useSetAddress(),
    setConnecting = useSetWalletConnecting(),
    setError = useSetConnectWalletError(),
    setWalletProvider = useSetWalletProvider(),
    setCurrentChain = useSetCurrentChain();

  const supportedChains = useSupportedChains();

  const currentChain = useCurrentChain();

  return {
    id: 1,
    name: 'WalletConnect',
    connect: async () => {
      setConnecting(true);
      try {
        const provider = await EthereumProvider.init({
          chains: [...supportedChains.map(chain => chain.id)],
          projectId,
          showQrModal: true,
        });

        provider.on('display_uri', (uri: string) => {
          console.log('URI: ', uri);
        });

        provider.on('chainChanged', (chainId: string) => {
          setCurrentChain?.(getChain(+chainId));
        });

        await provider.connect();

        const walletClient = createWalletClient({
          chain: currentChain ?? mainnet,
          transport: custom(provider),
        });

        if (!walletClient) {
          return;
        }
        setWalletProvider('WalletConnect');
        setWalletClient(walletClient);

        storePrevWallet('WalletConnect');
        const accounts = await walletClient.requestAddresses();
        storePrevAccount({
          accounts,
          chain: currentChain ?? supportedChains[0],
        });
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
