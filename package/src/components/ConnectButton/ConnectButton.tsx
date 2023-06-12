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
import {
  Image,
  ImageContainer,
  WalletButton,
} from '../ui/WalletButton/WalletButton';
import { Modal } from '../ui/Modal/Modal';

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
        <WalletButton
          wallet="metamask"
          disabled={connecting}
          onClick={connectMetamask}
        >
          <ImageContainer>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/800px-MetaMask_Fox.svg.png"
              alt="wallet"
            />
          </ImageContainer>
          {metaMaskName}
        </WalletButton>
        <WalletButton
          wallet="walletconnect"
          disabled={connecting}
          onClick={connectWalletConnect}
        >
          <ImageContainer>
            <Image
              src="https://api.nuget.org/v3-flatcontainer/walletconnect.core/2.0.4/icon"
              alt="wakllet"
            />
          </ImageContainer>
          {walletConnectName}
        </WalletButton>
        <WalletButton wallet="none" disabled={true}>
          <ImageContainer>🏗️</ImageContainer>
          Coming soon
        </WalletButton>
      </Modal>
    </>
  );
};
