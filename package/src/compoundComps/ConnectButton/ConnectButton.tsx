import React, { useContext, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { Modal, ModalProps } from '../../components/ui/Modal/Modal';
import { WalletButton } from '../../components/ui/WalletButton/WalletButton';
import { useMetaMaskWallet } from '../../components/Wallets/MetaMask/metaMaskWallet';
import { useWalletConnectWallet } from '../../components/Wallets/WalletConnect/walletConnectWallet';
import {
  useDisconnect,
  useWalletConnecting,
} from '../../components/KitProvider/AddressContext';

const ConnectButtonContext = React.createContext<{
  isOpen: boolean;
  openModal: React.MouseEventHandler<HTMLButtonElement> | undefined;
  closeModal: React.MouseEventHandler<SVGSVGElement> | undefined;
  connectMetamask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  connecting: boolean;
  disconnect: () => void;
}>({
  isOpen: false,
  closeModal: undefined,
  openModal: undefined,
  connectMetamask: async () => {
    // your function
  },
  connectWalletConnect: async () => {
    // your function here
  },
  connecting: false,
  disconnect: () => {
    // your function here
  },
});

interface CompoundConnectButtonProps {
  children: React.ReactNode;
}

export interface CompoundConnectButtonWithModalProps
  extends React.FC<CompoundConnectButtonProps> {
  Button: React.FC<Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>>;
  Modal: React.FC<Omit<ModalProps, 'isOpen' | 'onClose'>>;
  MetaMaskButton: React.FC<
    Omit<
      React.ComponentProps<typeof WalletButton>,
      'name' | 'disabled' | 'onClick'
    >
  >;
  WalletConnect: React.FC<
    Omit<
      React.ComponentProps<typeof WalletButton>,
      'name' | 'disabled' | 'onClick'
    >
  >;
  DisconnectButton: React.FC<
    Omit<React.ComponentProps<typeof Button>, 'onClick'>
  >;
}

export const ConnectButtonPrimitive: CompoundConnectButtonWithModalProps = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('closing modal');
    setIsOpen(false);
  };

  const { connect: connectMetamask } = useMetaMaskWallet({
    onClose: closeModal,
  });
  const { connect: connectWalletConnect } = useWalletConnectWallet({
    onClose: closeModal,
  });

  const connecting = useWalletConnecting();
  const disconnect = useDisconnect();

  return (
    <ConnectButtonContext.Provider
      value={{
        isOpen,
        closeModal,
        openModal,
        connectMetamask,
        connectWalletConnect,
        connecting,
        disconnect,
      }}
    >
      {children}
    </ConnectButtonContext.Provider>
  );
};

const contextData = () => useContext(ConnectButtonContext);

ConnectButtonPrimitive.Button = ({ children }) => {
  const { openModal } = contextData();
  return <Button onClick={openModal}>{children}</Button>;
};

ConnectButtonPrimitive.Modal = ({ children, closeButtonProps, ...props }) => {
  const { isOpen, closeModal } = contextData();
  return (
    <Modal
      {...props}
      isOpen={isOpen}
      closeButtonProps={closeButtonProps}
      onClose={closeModal}
    >
      {children}
    </Modal>
  );
};

ConnectButtonPrimitive.MetaMaskButton = ({ children, ...props }) => {
  const { connectMetamask, connecting } = contextData();
  return (
    <WalletButton
      {...props}
      name="metamask"
      disabled={connecting}
      onClick={connectMetamask}
    >
      {children}
    </WalletButton>
  );
};

ConnectButtonPrimitive.WalletConnect = ({ children, ...props }) => {
  const { connectWalletConnect, connecting } = contextData();
  return (
    <WalletButton
      {...props}
      name="walletconnect"
      disabled={connecting}
      onClick={connectWalletConnect}
    >
      {children}
    </WalletButton>
  );
};

ConnectButtonPrimitive.DisconnectButton = ({ children, ...props }) => {
  const { disconnect } = contextData();
  return (
    <Button {...props} onClick={disconnect}>
      {children}
    </Button>
  );
};
