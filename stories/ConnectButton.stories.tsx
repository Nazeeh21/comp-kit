import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { mainnet } from 'viem/chains';
import { ConnectButton, KitProvider } from '../package/src';

const Comp = () => {
  if (typeof window?.ethereum === 'undefined') return <ConnectButton />;
  return (
    <KitProvider initialChain={mainnet} supportedChains={[mainnet]}>
      <ConnectButton />
    </KitProvider>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'ConnectButton',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
