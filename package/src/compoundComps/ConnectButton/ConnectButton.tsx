import React, { useContext, useState } from 'react';
import { Button } from '../../components/ui/Button/Button';
import { Modal } from '../../components/ui/Modal/Modal';
import { WalletButton } from '../../components/ui/WalletButton/WalletButton';
import { useMetaMaskWallet } from '../../components/Wallets/metaMaskWallet';
import { useWalletConnectWallet } from '../../components/Wallets/walletConnectWallet';
import { useWalletConnecting } from '../../components/KitProvider/AddressContext';

const CompoundConnectButtonContext = React.createContext<{
  isOpen: boolean;
  openModal: React.MouseEventHandler<HTMLButtonElement> | undefined;
  closeModal: React.MouseEventHandler<SVGSVGElement> | undefined;
  connectMetamask: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  connecting: boolean;
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
});

export interface CompoundConnectButtonProps {
  children: React.ReactNode;
}

interface CompoundConnectButtonWithModalProps
  extends React.FC<CompoundConnectButtonProps> {
  Button: React.FC<Omit<React.HTMLAttributes<HTMLButtonElement>, 'onClick'>>;
  Modal: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  MetaMaskButton: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
  WalletConnect: React.FC<React.HTMLAttributes<HTMLButtonElement>>;
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

  return (
    <CompoundConnectButtonContext.Provider
      value={{
        isOpen,
        closeModal,
        openModal,
        connectMetamask,
        connectWalletConnect,
        connecting,
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

CompoundConnectButton.Modal = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { isOpen, closeModal } = contextData();
  return (
    <Modal {...props} isOpen={isOpen} onClose={closeModal}>
      {children}
    </Modal>
  );
};

CompoundConnectButton.MetaMaskButton = ({
  children,
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { connectMetamask, connecting } = contextData();
  return (
    <WalletButton
      name="metamask"
      disabled={connecting}
      onClick={connectMetamask}
    >
      {children}
    </WalletButton>
  );
};

CompoundConnectButton.WalletConnect = ({
  children,
}: React.HTMLAttributes<HTMLButtonElement>) => {
  const { connectWalletConnect, connecting } = contextData();
  return (
    <WalletButton
      name="walletconnect"
      disabled={connecting}
      onClick={connectWalletConnect}
    >
      {children}
    </WalletButton>
  );
};
