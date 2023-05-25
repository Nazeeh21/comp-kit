import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ConnectButton, KitProvider } from '../package/src';
import { mainnet } from 'viem/chains';
import { custom } from 'viem';

const Comp = () => (
  // @ts-expect-error This error is expected because we are mocking the window obejct on the server.
  <KitProvider chains={mainnet} transport={custom(window.ethereum)}>
    <ConnectButton />
  </KitProvider>
);

const meta: Meta<typeof Comp> = {
  title: 'ConnectButton',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
