import { useWalletClient } from '../../components/KitProvider/KitProvider';
import { getChain } from '../../utils/utils';

export const useSwitchChain = () => {
  const walletClient = useWalletClient();

  const switchChain = async (chainId: number) => {
    try {
      await walletClient?.switchChain({
        id: chainId,
      });
      return chainId;
    } catch (error) {
      console.log('Error while switching chain: ', { error });
      // @ts-expect-error trying to add the network if it doesn't exist
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (+error.cause.code === 4902) {
        console.log('Trying to add chain: ', { error });
        const chain = getChain(chainId);
        console.log('chain: ', { chain });
        if (!chain) return;

        try {
          console.log('adding chain');
          await walletClient?.addChain({
            chain,
          });
          return chainId;
        } catch (error) {
          console.log('Error while adding chain: ', { error });
          return false;
        }
      }
      return false;
    }
  };

  return {
    switchChain,
  };
};
