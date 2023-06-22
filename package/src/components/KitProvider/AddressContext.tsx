import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Address } from 'viem';
import { removePrevAccount, removePrevWallet } from '../../utils/utils';
import { MetaMaskFunc } from '../Wallets/MetaMask/MetamaskFunc';
import { useSetWalletClient, useWalletClient } from './KitProvider';

interface AddressContextProps {
  address: Address[] | undefined;
  setAddress: React.Dispatch<React.SetStateAction<Address[] | undefined>>;
  connecting: boolean;
  setConnecting: React.Dispatch<React.SetStateAction<boolean>>;
  error: Error | undefined;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  walletProvider: 'MetaMask' | 'WalletConnect' | undefined;
  setWalletProvider: React.Dispatch<
    React.SetStateAction<'MetaMask' | 'WalletConnect' | undefined>
  >;
  isConnected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  disconnectWallet: () => void;
}

const AddressContext = createContext<AddressContextProps>({
  address: undefined,
  setAddress: () => undefined,
  connecting: false,
  setConnecting: () => undefined,
  error: undefined,
  setError: () => undefined,
  status: 'disconnected',
  walletProvider: undefined,
  setWalletProvider: () => undefined,
  isConnected: false,
  setConnected: () => undefined,
  disconnectWallet: () => undefined,
});

interface AddressContextProviderProps {
  children: ReactNode;
}

export const AddressContextProvider: FC<AddressContextProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address[] | undefined>();
  const [connecting, setConnecting] = useState(false);
  const [isConnected, setConnected] = useState(false);
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<
    'connecting' | 'connected' | 'disconnected' | 'error'
  >('disconnected');
  const [walletProvider, setWalletProvider] = useState<
    'MetaMask' | 'WalletConnect'
  >();

  const walletClient = useWalletClient();
  const setWalletClient = useSetWalletClient();

  const disconnectWallet = useCallback(async () => {
    await walletClient?.request({
      method: 'eth_requestAccounts',
      params: undefined,
    });

    removePrevWallet();
    removePrevAccount();
    setAddress(undefined);
    setWalletProvider(undefined);
    setWalletClient(undefined);
    setConnected(false);
  }, [walletClient]);

  useEffect(() => {
    console.log('address from AddressContext: ', address);
  }, [address]);
  useEffect(() => {
    if (connecting) {
      setStatus('connecting');
    } else if (address && !error) {
      setStatus('connected');
      setConnected(true);
    } else if (error) {
      setStatus('error');
      setConnected(false);
    } else {
      setStatus('disconnected');
      setConnected(false);
    }
  }, [connecting, address, error]);

  return (
    <AddressContext.Provider
      value={useMemo(
        () => ({
          address,
          setAddress,
          connecting,
          setConnecting,
          error,
          setError,
          status,
          walletProvider,
          setWalletProvider,
          isConnected,
          setConnected,
          disconnectWallet,
        }),
        [
          address,
          connecting,
          error,
          status,
          walletProvider,
          isConnected,
          setConnected,
          disconnectWallet,
        ]
      )}
    >
      <MetaMaskFunc>{children}</MetaMaskFunc>
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext).address;

export const useSetAddress = () => useContext(AddressContext).setAddress;

export const useWalletConnecting = () => useContext(AddressContext).connecting;

export const useSetWalletConnecting = () =>
  useContext(AddressContext).setConnecting;

export const useConnectWalletError = () => useContext(AddressContext).error;

export const useSetConnectWalletError = () =>
  useContext(AddressContext).setError;

export const useWalletStatus = () => useContext(AddressContext).status;

export const useWalletProvider = () =>
  useContext(AddressContext).walletProvider;

export const useSetWalletProvider = () =>
  useContext(AddressContext).setWalletProvider;

export const useIsConnected = () => useContext(AddressContext).isConnected;

export const useSetConnected = () => useContext(AddressContext).setConnected;

export const useDisconnect = () => useContext(AddressContext).disconnectWallet;

export const useAccount = () => {
  const {
    address,
    connecting,
    error,
    status,
    isConnected,
    disconnectWallet,
    walletProvider,
  } = useContext(AddressContext);

  return useMemo(
    () => ({
      address,
      connecting,
      error,
      status,
      isConnected,
      disconnectWallet,
      walletProvider,
    }),
    [
      address,
      connecting,
      error,
      status,
      isConnected,
      disconnectWallet,
      walletProvider,
    ]
  );
};
