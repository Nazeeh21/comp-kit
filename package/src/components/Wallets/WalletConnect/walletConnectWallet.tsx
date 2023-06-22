import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import {
  useDisconnect,
  useSetAddress,
  useSetConnectWalletError,
  useSetWalletConnecting,
  useSetWalletProvider,
} from '../../KitProvider/AddressContext';
import {
  useProjectId,
  useSetWalletClient,
} from '../../KitProvider/KitProvider';
import {
  useCurrentChain,
  useSetCurrentChain,
  useSupportedChains,
} from '../../KitProvider/ChainContext';
import {
  getChain,
  getPrevAccount,
  getPrevWallet,
  storePrevAccount,
  storePrevWallet,
} from '../../../utils/utils';
import { useEffect } from 'react';

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
    setWalletProvider = useSetWalletProvider();

  const supportedChains = useSupportedChains();
  const setCurrentChain = useSetCurrentChain();

  const currentChain = useCurrentChain();
  const disconnect = useDisconnect();

  useEffect(() => {
    // this reconnects the wallet on reloads if the user has connected using WalletConnect previously
    const prevAccountData = getPrevAccount();
    const accounts = prevAccountData?.data.accounts;
    const storedChainData = prevAccountData?.data.chain;

    const reconnect = async () => {
      try {
        if (
          getPrevWallet() === 'WalletConnect' &&
          accounts &&
          storedChainData
        ) {
          const provider = await EthereumProvider.init({
            chains: [...supportedChains.map(chain => chain.id)],
            projectId,
            showQrModal: false,
          });

          setCurrentChain?.(getChain(storedChainData.id));

          provider.on('chainChanged', (chainId: string) => {
            setCurrentChain?.(getChain(+chainId));
          });

          const walletClient = createWalletClient({
            chain: currentChain ?? mainnet,
            transport: custom(provider),
          });

          setWalletProvider('WalletConnect');
          setWalletClient(walletClient);
          setAddress(accounts);
        }
      } catch (error) {
        console.log(
          'Error while automatically re-connecting WalletConnect',
          error
        );
        disconnect();
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error(
            'Error while automatically re-connecting WalletConnect'
          );
        }
      }
    };

    void reconnect();
  }, []);

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
