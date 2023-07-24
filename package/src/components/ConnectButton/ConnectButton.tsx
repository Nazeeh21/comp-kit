import { LogOut } from 'lucide-react';
import React, { useState } from 'react';
import { useEnsName } from '../../hooks/ensHooks/useEnsName';
import { useBalance } from '../../hooks/useBalance';
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
import { Arrow } from '../ui/Modal/styles';
import {
  Image,
  ImageContainer,
  WalletButton,
} from '../ui/WalletButton/WalletButton';
import { useGetNativeToken } from '../../utils/nativeTokens';
import { useCurrentChain } from '../KitProvider/ChainContext';
import { mainnet } from 'viem/chains';

export const ConnectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisconnectModal, setIsDisconnectModal] = useState(false);

  const status = useWalletStatus();
  const address = useAddress();
  const connecting = useWalletConnecting();
  const disconnect = useDisconnect();
  const currentChain = useCurrentChain();
  const { nativeToken } = useGetNativeToken({ chain: currentChain ?? mainnet });

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
    address: address?.[0] ?? '0x0',
  });

  const { etherBalance } = useBalance({
    address: address?.[0] ?? '0x0',
    blockTag: 'latest',
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
            {ensName ??
              address.toString().substring(0, 6) +
                '...' +
                address.toString().substring(address.toString().length - 4)}
          </div>
          <Button style={{ backgroundColor: 'rgba(1,1,1,0.1)' }}>
            {etherBalance
              ? etherBalance.toString().slice(0, 4) + ' ' + nativeToken
              : 'Disconnect'}
          </Button>
        </Button>
        <Modal
          heading="Connected"
          closeOnOverlayClick
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
      <Modal
        heading="Connect Wallet"
        isOpen={isOpen}
        closeOnOverlayClick
        onClose={closeModal}
      >
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
