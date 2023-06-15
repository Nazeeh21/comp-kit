import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { goerli, mainnet } from 'viem/chains';
import { ConnectButtonPrimitive, KitProvider } from '../../package/src';

const Comp = () => {
  if (typeof window?.ethereum === 'undefined') return <>Window is undefined</>;
  return (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet}
      supportedChains={[mainnet, goerli]}
    >
      <ConnectButtonPrimitive>
        <ConnectButtonPrimitive.Button>
          Compound COnnect Button
        </ConnectButtonPrimitive.Button>
        <ConnectButtonPrimitive.Modal
          closeOnOverlayClick={true}
          style={{ background: 'cyan' }}
          closeButtonProps={{ style: { background: 'yellow' } }}
        >
          <ConnectButtonPrimitive.MetaMaskButton
            style={{ background: 'yellow' }}
          >
            Metamask
          </ConnectButtonPrimitive.MetaMaskButton>
          <ConnectButtonPrimitive.WalletConnect
            style={{ background: 'yellow' }}
          >
            WalletConnect
          </ConnectButtonPrimitive.WalletConnect>
        </ConnectButtonPrimitive.Modal>
        <ConnectButtonPrimitive.DisconnectButton>
          Disconnect Wallet
        </ConnectButtonPrimitive.DisconnectButton>
      </ConnectButtonPrimitive>
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
