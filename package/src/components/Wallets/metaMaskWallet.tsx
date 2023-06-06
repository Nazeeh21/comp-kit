import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { BaseRpcRequests } from 'viem/dist/types/clients/transports/createTransport';
import { useAddress } from '../../hooks/useAddress';
import { useSetWalletClient } from '../KitProvider/KitProvider';

type EthereumProvider = { request: BaseRpcRequests['request'] };

export const useMetaMaskWallet = () => {
  const { setAddress } = useAddress();
  const setWalletClient = useSetWalletClient();
  return {
    id: 1,
    name: 'MetaMask',
    connect: async () => {
      if (typeof window === 'undefined' || !window.ethereum) {
        console.log('No window.ethereum');
        return;
      }
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom((window.ethereum as unknown) as EthereumProvider),
      });
      console.log({ walletClient });
      setWalletClient(walletClient);

      const accounts = await walletClient.requestAddresses();
      console.log(accounts);
      setAddress(accounts);
    },
  };
};
