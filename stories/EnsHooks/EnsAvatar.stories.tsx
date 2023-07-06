import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Chain, arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider, useEnsAvatar } from '../../package/src';

const Comp = ({ ensName }: { ensName: string }) => {
  const { avatar, fetching, error } = useEnsAvatar({ ensName });
  if (typeof window?.ethereum === 'undefined') return <>Window is undefined</>;
  return (
    <>
      {fetching && <div style={{ fontSize: '1rem' }}>Fetching...</div>}
      {avatar && (
        <div>
          Avatar Link: {avatar}
          <div>
            <img
              style={{
                width: '5rem',
                borderRadius: '0.5rem',
                marginTop: '1rem',
              }}
              src={avatar}
              alt={ensName}
            />
          </div>
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
      {!fetching && !avatar && !error && (
        <div>No avatar found for this address</div>
      )}
    </>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Hooks/useEnsAvatar',
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
  args: {
    ensName: 'wagmi-dev.eth',
  },
};
