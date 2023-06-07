import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Address, createWalletClient, custom } from 'viem';
import { useSetWalletClient, useWalletClient } from './KitProvider';
import { mainnet } from 'viem/chains';
import EthereumProvider from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';

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
});

interface AddressContextProviderProps {
  children: ReactNode;
}

export const AddressContextProvider: FC<AddressContextProviderProps> = ({
  children,
}) => {
  const [address, setAddress] = useState<Address[] | undefined>();
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<Error>();
  const [status, setStatus] = useState<
    'connecting' | 'connected' | 'disconnected' | 'error'
  >('disconnected');
  const [walletProvider, setWalletProvider] = useState<
    'MetaMask' | 'WalletConnect'
  >();

  const walletClient = useWalletClient();
  const setWalletClient = useSetWalletClient();

  useEffect(() => {
    void (async () => {
      const accounts = await walletClient?.getAddresses();
      if (accounts && accounts.length > 0) {
        setAddress(accounts);
        console.log('Setting address', accounts);
      } else {
        setAddress(undefined);
      }
    })();
  }, [walletClient]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window?.ethereum) {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom((window.ethereum as unknown) as EthereumProvider),
      });
      setWalletClient(walletClient);
    }
  }, []);
  useEffect(() => {
    if (connecting) {
      setStatus('connecting');
    } else if (address && !error) {
      setStatus('connected');
    } else if (error) {
      setStatus('error');
    } else {
      setStatus('disconnected');
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
        }),
        [address, connecting, error, status, walletProvider]
      )}
    >
      {children}
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
