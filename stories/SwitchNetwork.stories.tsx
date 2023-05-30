import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { arbitrum, goerli, polygonMumbai } from 'viem/chains';
import { KitProvider, SwitchNetworks } from '../package/src';

const Comp = () => (
  <KitProvider
    chains={goerli}
    supportedChains={[goerli, arbitrum, polygonMumbai]}
    initialChain={goerli}
  >
    <SwitchNetworks />
  </KitProvider>
);

const meta: Meta<typeof Comp> = {
  title: 'SwitchNetworks',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
