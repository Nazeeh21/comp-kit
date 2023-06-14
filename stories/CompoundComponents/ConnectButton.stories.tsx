import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { goerli, mainnet } from 'viem/chains';
import { CompoundConnectButton, KitProvider } from '../../package/src';

const Comp = () => {
  if (typeof window?.ethereum === 'undefined') return <>Window is undefined</>;
  return (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet}
      supportedChains={[mainnet, goerli]}
    >
      <CompoundConnectButton>
        <CompoundConnectButton.Button>
          Compound COnnect Button
        </CompoundConnectButton.Button>
        <CompoundConnectButton.Modal
          closeOnOverlayClick={true}
          style={{ background: 'cyan' }}
          closeButtonProps={{ style: { background: 'yellow' } }}
        >
          <CompoundConnectButton.MetaMaskButton
            style={{ background: 'yellow' }}
          >
            Metamask
          </CompoundConnectButton.MetaMaskButton>
          <CompoundConnectButton.WalletConnect style={{ background: 'yellow' }}>
            WalletConnect
          </CompoundConnectButton.WalletConnect>
        </CompoundConnectButton.Modal>
        <CompoundConnectButton.DisconnectButton>
          Disconnect Wallet
        </CompoundConnectButton.DisconnectButton>
      </CompoundConnectButton>
    </KitProvider>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Compound Comps/ConnectButton',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
