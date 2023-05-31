import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider, SwitchNetworks } from '../package/src';
import { custom } from 'viem';

const Comp = () => {
  if (typeof window.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <KitProvider
      chains={mainnet}
      // @ts-expect-error This error is expected because we are mocking the window obejct on the server.
      transport={custom(window.ethereum)}
      supportedChains={[goerli, arbitrum, polygonMumbai, mainnet]}
      initialChain={goerli}
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
