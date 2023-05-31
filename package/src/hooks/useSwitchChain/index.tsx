import { useEffect, useState } from 'react';
import {
  usePublicClient,
  useWalletClient,
} from '../../components/KitProvider/KitProvider';
import { getChain } from '../../utils/utils';

export const useSwitchChain = () => {
  const walletClient = useWalletClient();
  const publicClient = usePublicClient();
  const [switchingToChainId, setSwitchingToChainId] = useState<number | null>();

  useEffect(() => {
    if (!window.ethereum) return;

    // @ts-expect-error trying to add eventLister on window.ethereum object
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    window.ethereum.on('chainChanged', () => {
      // handle chain change
      setSwitchingToChainId(null);
    });
  }, [publicClient]);

  const switchChain = async (chainId: number) => {
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
          return false;
        }
      }
      return false;
    }
  };

  return {
    switchChain,
    switchingToChainId,
  };
};
