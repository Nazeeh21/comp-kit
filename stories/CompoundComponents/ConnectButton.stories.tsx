import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chain, arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import {
  ConnectButtonPrimitive,
  KitProvider,
  useAccount,
} from '../../package/src';

const Comp = () => {
  const { address, isConnected } = useAccount();

  if (typeof window?.ethereum === 'undefined') return <>Window is undefined</>;
  return (
    <ConnectButtonPrimitive>
      {isConnected && address ? (
        <>
          <div>Connected address: {address?.[0].toString()}</div>
          <ConnectButtonPrimitive.DisconnectButton
            style={{ background: '#333', color: 'white', opacity: 0.9 }}
          >
            Disconnect Wallet
          </ConnectButtonPrimitive.DisconnectButton>
        </>
      ) : (
        <>
          <ConnectButtonPrimitive.Button>
            Compound Connect Button
          </ConnectButtonPrimitive.Button>
          <ConnectButtonPrimitive.Modal
            heading="Custom Connect Wallet"
            closeOnOverlayClick={true}
            style={{ background: '#333', color: 'white', opacity: 0.9 }}
            closeButtonProps={{
              style: {
                background: '#ccc',
                color: 'black',
                border: '1.5px solid black',
              },
            }}
          >
            <ConnectButtonPrimitive.MetaMaskButton
              style={{
                background: '#2c97de',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Metamask
            </ConnectButtonPrimitive.MetaMaskButton>
            <ConnectButtonPrimitive.WalletConnect
              style={{
                background: '#2c97de',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              WalletConnect
            </ConnectButtonPrimitive.WalletConnect>
          </ConnectButtonPrimitive.Modal>
        </>
      )}
    </ConnectButtonPrimitive>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Compound Comps/ConnectButton',
  component: Comp,
  decorators: [
    Story => {
      if (typeof window?.ethereum === 'undefined')
        return <div>window.ethereum is undefined</div>;
      return (
        <KitProvider
          projectId="5a13f1a5297da2cd768519079890e4fe"
          initialChain={mainnet as Chain}
          supportedChains={[goerli, arbitrum, polygonMumbai, mainnet]}
        >
          <Story />
        </KitProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
