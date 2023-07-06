import React, { useState } from 'react';
import {
  useAddress,
  useDisconnect,
  useWalletConnecting,
  useWalletStatus,
} from '../KitProvider/AddressContext';
import { useMetaMaskWallet } from '../Wallets/MetaMask/metaMaskWallet';
import { useWalletConnectWallet } from '../Wallets/WalletConnect/walletConnectWallet';
import { Button } from '../ui/Button/Button';
import { Modal } from '../ui/Modal/Modal';
import {
  Image,
  ImageContainer,
  WalletButton,
} from '../ui/WalletButton/WalletButton';
import { Arrow } from '../ui/Modal/styles';

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const status = useWalletStatus();
  const address = useAddress();
  const connecting = useWalletConnecting();
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
      <Button>
        <div>
          {address.toString().substring(0, 6)}...
          {address.toString().substring(address.toString().length - 4)}
        </div>
        <Button onClick={disconnect}>Disconnect</Button>
      </Button>
    );
  }

  return (
    <>
      <Button onClick={openModal}>Connect Wallet</Button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <WalletButton disabled={connecting} onClick={connectMetamask}>
          <ImageContainer wallet="metamask">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              alt="wallet"
            />
          </ImageContainer>
          {metaMaskName}
          <Arrow />
        </WalletButton>
        <WalletButton disabled={connecting} onClick={connectWalletConnect}>
          <ImageContainer wallet="walletconnect">
            <Image
              src="https://altcoinsbox.com/wp-content/uploads/2023/04/wallet-connect-logo.png"
              alt="wallet"
            />
          </ImageContainer>
          {walletConnectName}
          <Arrow />
        </WalletButton>
        <WalletButton disabled={true}>
          <ImageContainer wallet="none">🏗️</ImageContainer>
          Coming soon
          <Arrow />
        </WalletButton>
      </Modal>
    </>
  );
};
