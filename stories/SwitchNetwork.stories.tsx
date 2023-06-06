import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider, SwitchNetworks } from '../package/src';

const Comp = () => {
  if (typeof window.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <KitProvider
      initialChain={mainnet}
      supportedChains={[goerli, arbitrum, polygonMumbai, mainnet]}
    >
      <SwitchNetworks />
    </KitProvider>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'SwitchNetworks',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
