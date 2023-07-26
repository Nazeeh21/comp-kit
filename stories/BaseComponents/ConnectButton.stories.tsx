import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  arbitrum,
  bsc,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
} from 'viem/chains';
import { ConnectButton, KitProvider } from '../../package/src';

const Comp = () => {
  if (typeof window?.ethereum === 'undefined') return <ConnectButton />;
  return (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet}
      supportedChains={[
        goerli,
        arbitrum,
        polygonMumbai,
        mainnet,
        polygon,
        optimism,
        bsc,
      ]}
    >
      <ConnectButton />
    </KitProvider>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Pure Comps/ConnectButton',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
