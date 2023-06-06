import React, { useState } from 'react';
import { useMetaMaskWallet } from '../Wallets/metaMaskWallet';
import { useWalletConnectWallet } from '../Wallets/wallectConnectWallet';
import { Button } from '../ui/Button/Button';
import { Modal } from '../ui/Modal/Modal';

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { name: metaMaskName, connect: connectMetamask } = useMetaMaskWallet();
  const {
    name: walletConnectName,
    connect: connectWalletConnect,
  } = useWalletConnectWallet();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={openModal}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Button onClick={connectMetamask}>{metaMaskName}</Button>
        <Button onClick={connectWalletConnect}>{walletConnectName}</Button>
      </Modal>
    </>
  );
};
