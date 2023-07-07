import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { Address, createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { useEffect } from 'react';
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

interface useWalletConnectWalletProps {
  onClose?: () => void;
}

export const useWalletConnectWallet = ({
  onClose,
}: useWalletConnectWalletProps) => {
  const projectId = useProjectId();
  const supportedChains = useSupportedChains();
  const currentChain = useCurrentChain();
  const setWalletClient = useSetWalletClient();
  const setAddress = useSetAddress();
  const setConnecting = useSetWalletConnecting();
  const setError = useSetConnectWalletError();
  const setWalletProvider = useSetWalletProvider();
  const setCurrentChain = useSetCurrentChain();
  const disconnect = useDisconnect();

  useEffect(() => {
    const reconnectWalletConnect = async () => {
      const prevAccountData = getPrevAccount();
      const prevWallet = getPrevWallet();
      const accounts = prevAccountData?.data.accounts;
      const storedChainData = prevAccountData?.data.chain;

      if (prevWallet !== 'WalletConnect' || !accounts || !storedChainData) {
        return;
      }

      try {
        const provider = await EthereumProvider.init({
          chains: supportedChains.map(chain => chain.id),
          projectId,
          showQrModal: false,
          optionalChains: [
            supportedChains[0].id,
            ...supportedChains.slice(1).map(chain => chain.id),
          ],
        });

        setCurrentChain?.(getChain(storedChainData.id));
        await provider.connect();

        provider.on('chainChanged', (chainId: string) => {
          setCurrentChain?.(getChain(+chainId));
        });

        provider.on('accountsChanged', accounts => {
          setAddress(accounts as Address[]);
        });

        provider.on('disconnect', () => {
          disconnect();
        });

        const walletClient = createWalletClient({
          chain: currentChain ?? mainnet,
          transport: custom(provider),
        });

        setWalletProvider('WalletConnect');
        setWalletClient(walletClient);
      } catch (error) {
        console.log(
          'Error while automatically re-connecting WalletConnect',
          error
        );
        disconnect();
        throw new Error(
          error instanceof Error
            ? error.message
            : 'Error while automatically re-connecting WalletConnect'
        );
      }
    };

    void reconnectWalletConnect();
  }, []);

  const connectWalletConnect = async () => {
    setConnecting(true);

    try {
      const provider = await EthereumProvider.init({
        chains: supportedChains.map(chain => chain.id),
        projectId,
        showQrModal: true,
        optionalChains: [
          supportedChains[0].id,
          ...supportedChains.slice(1).map(chain => chain.id),
        ],
      });

      provider.on('display_uri', (uri: string) => {
        console.log('URI: ', uri);
      });

      await provider.connect();

      provider.on('chainChanged', (chainId: string) => {
        setCurrentChain?.(getChain(+chainId));
      });

      provider.on('accountsChanged', accounts => {
        setAddress(accounts as Address[]);
      });

      provider.on('disconnect', () => {
        disconnect();
      });

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
    } catch (error) {
      console.log('Error while connecting WalletConnect', error);
      setError(
        error instanceof Error
          ? error
          : new Error('Error while connecting WalletConnect')
      );
    } finally {
      setConnecting(false);
    }
  };

  return {
    id: 1,
    name: 'WalletConnect',
    connect: connectWalletConnect,
  };
};
