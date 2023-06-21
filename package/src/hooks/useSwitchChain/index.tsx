import { useEffect, useState } from 'react';
import {
  useIsConnected,
  useWalletProvider,
} from '../../components/KitProvider/AddressContext';
import {
  usePublicClient,
  useWalletClient,
} from '../../components/KitProvider/KitProvider';
import { getChain } from '../../utils/utils';

export const useSwitchChain = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const [switchingToChainId, setSwitchingToChainId] = useState<number | null>(
    null
  );
  const isConnected = useIsConnected();
  const walletProvider = useWalletProvider();

  useEffect(() => {
    // Detect chain changed for MetaMask
    if (!window?.ethereum && walletProvider !== 'MetaMask') return;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window?.ethereum.on('chainChanged', () => {
      setSwitchingToChainId(null);
    });

    return () => {
      // @ts-expect-error trying to remove eventLister on window?.ethereum object
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window?.ethereum?.removeListener('chainChanged', () =>
        setSwitchingToChainId(null)
      );
    };
  }, [publicClient]);

  const switchChain = async (chainId: number) => {
    if (!isConnected) return false;
    setSwitchingToChainId(chainId);
    try {
      await walletClient?.switchChain({
        id: chainId,
      });
      return chainId;
    } catch (error) {
      // @ts-expect-error trying to add the network if it doesn't exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (+error.cause.code === 4902) {
        const chain = getChain(chainId);

        if (!chain) return false;

        try {
          await walletClient?.addChain({
            chain,
          });
        } catch (error) {
          console.error('Error while adding chain', error);
          throw new Error(`Error while adding chain ${chainId}`);
        }
      }
      console.error('Error while switching chain', error);
      throw new Error(`Error while switching chain to ${chainId}`);
    } finally {
      setSwitchingToChainId(null);
    }
  };

  return {
    switchChain,
    switchingToChainId,
  };
};
