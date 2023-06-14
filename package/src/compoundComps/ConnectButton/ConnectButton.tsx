import React, { useContext, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { Modal, ModalProps } from '../../components/ui/Modal/Modal';
import { WalletButton } from '../../components/ui/WalletButton/WalletButton';
import { useMetaMaskWallet } from '../../components/Wallets/metaMaskWallet';
import { useWalletConnectWallet } from '../../components/Wallets/walletConnectWallet';
import {
  useDisconnect,
  useWalletConnecting,
} from '../../components/KitProvider/AddressContext';

const CompoundConnectButtonContext = React.createContext<{
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

export interface CompoundConnectButtonProps {
  children: React.ReactNode;
}

interface CompoundConnectButtonWithModalProps
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

export const CompoundConnectButton: CompoundConnectButtonWithModalProps = ({
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
    <CompoundConnectButtonContext.Provider
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
    </CompoundConnectButtonContext.Provider>
  );
};

const contextData = () => useContext(CompoundConnectButtonContext);

CompoundConnectButton.Button = ({ children }) => {
  const { openModal } = contextData();
  return <Button onClick={openModal}>{children}</Button>;
};

CompoundConnectButton.Modal = ({ children, closeButtonProps, ...props }) => {
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

CompoundConnectButton.MetaMaskButton = ({ children, ...props }) => {
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

CompoundConnectButton.WalletConnect = ({ children, ...props }) => {
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

CompoundConnectButton.DisconnectButton = ({ children, ...props }) => {
  const { disconnect } = contextData();
  return (
    <Button {...props} onClick={disconnect}>
      {children}
    </Button>
  );
};
