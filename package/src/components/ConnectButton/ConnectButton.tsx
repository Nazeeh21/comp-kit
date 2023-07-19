import React, { useState } from 'react';
import {
  useAddress,
  useDisconnect,
  useWalletConnecting,
  useWalletStatus,
} from '../KitProvider/AddressContext';
import { useMetaMaskWallet } from '../Wallets/MetaMask/metaMaskWallet';
import { useEnsName } from '../../hooks/ensHooks/useEnsName';
import { useWalletConnectWallet } from '../Wallets/WalletConnect/walletConnectWallet';
import { Button } from '../ui/Button/Button';
import { Modal } from '../ui/Modal/Modal';
import {
  Image,
  ImageContainer,
  WalletButton,
} from '../ui/WalletButton/WalletButton';
import { Arrow } from '../ui/Modal/styles';
import { LogOut } from 'lucide-react';

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  const status = useWalletStatus();
  const address = useAddress();
  const connecting = useWalletConnecting();
  const disconnect = useDisconnect();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsDisconnectModal(false);
  };

  const { name: metaMaskName, connect: connectMetamask } = useMetaMaskWallet({
    onClose: closeModal,
  });
  const {
    name: walletConnectName,
    connect: connectWalletConnect,
  } = useWalletConnectWallet({ onClose: closeModal });

  const { ensName } = useEnsName({
    address: address?.[0] ? address[0] : '0x0',
  });

  if (status === 'connected' && address) {
    console.log('address', address);
    return (
      <>
        <Button
          style={{
            padding: '0',
            gap: '0.5rem',
            paddingLeft: '0.5rem',
          }}
          onClick={() => {
            setIsDisconnectModal(true);
          }}
        >
          <div>
            {!ensName && address.toString().substring(0, 6)}...
            {!ensName &&
              address.toString().substring(address.toString().length - 4)}
            {ensName && ensName}
          </div>
          <Button style={{ backgroundColor: 'rgba(1,1,1,0.1)' }}>
            0.001 ETH
          </Button>
        </Button>
        <Modal
          heading="Connected"
          isOpen={isDisconnectModal}
          onClose={() => {
            setIsDisconnectModal(false);
          }}
        >
          <Button
            onClick={disconnect}
            style={{ gap: '0.5rem', fontSize: '1.2rem' }}
          >
            Disconnect
            <LogOut />
          </Button>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button onClick={openModal}>Connect Wallet</Button>
      <Modal heading="Connect Wallet" isOpen={isOpen} onClose={closeModal}>
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
