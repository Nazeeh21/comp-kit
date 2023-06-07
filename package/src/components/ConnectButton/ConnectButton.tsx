import React, { useState } from 'react';

import {
  useAddress,
  useDisconnect,
  useWalletConnecting,
  useWalletProvider,
  useWalletStatus,
} from '../KitProvider/AddressContext';
import { useMetaMaskWallet } from '../Wallets/metaMaskWallet';
import { useWalletConnectWallet } from '../Wallets/wallectConnectWallet';
import { Button } from '../ui/Button/Button';
import { Modal } from '../ui/Modal/Modal';
import { PendingPulse } from '../ui/Select/styles';

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const status = useWalletStatus();
  const address = useAddress();
  const connecting = useWalletConnecting();
  const walletProvider = useWalletProvider();
  const disconnect = useDisconnect();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log('closing modal');
    setIsOpen(false);
  };

  const { name: metaMaskName, connect: connectMetamask } = useMetaMaskWallet({
    onClose: closeModal,
  });
  const {
    name: walletConnectName,
    connect: connectWalletConnect,
  } = useWalletConnectWallet({ onClose: closeModal });

  if (status === 'connected' && address) {
    console.log('address', address);
    return (
      <div>
        <div>Connected address: {address}</div>
        <Button onClick={disconnect}>Disconnect</Button>
      </div>
    );
  }

  return (
    <>
      <Button onClick={openModal}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Button
          css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          disabled={connecting}
          onClick={connectMetamask}
        >
          {metaMaskName}
          {connecting && walletProvider === 'MetaMask' && <PendingPulse />}
        </Button>
        <Button
          css={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          disabled={connecting}
          onClick={connectWalletConnect}
        >
          {walletConnectName}
          {connecting && walletProvider === 'WalletConnect' && <PendingPulse />}
        </Button>
      </Modal>
    </>
  );
};
