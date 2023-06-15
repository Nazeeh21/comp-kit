import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider } from '../../package/src';
import { CompoundSwitchNetwork } from '../../package/src/compoundComps/SwitchNetwork/SwitchNetwork';

import type { Chain } from 'viem';

const CustomStyleComp = () => {
  if (typeof window?.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet as Chain}
      supportedChains={[goerli, arbitrum, polygonMumbai, mainnet]}
    >
      <CompoundSwitchNetwork style={{ background: 'cyan' }}>
        <CompoundSwitchNetwork.Option
          style={{ border: '2px solid cyan', background: 'red' }}
          value={mainnet}
        >
          mainnet 1
        </CompoundSwitchNetwork.Option>
        <CompoundSwitchNetwork.Option value={goerli}>
          goerli 2
        </CompoundSwitchNetwork.Option>
        <CompoundSwitchNetwork.Option css={{ color: 'blue' }} value={arbitrum}>
          arbitrum 3
        </CompoundSwitchNetwork.Option>
      </CompoundSwitchNetwork>
    </KitProvider>
  );
};

const Comp = () => {
  if (typeof window?.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet as Chain}
      supportedChains={[goerli, arbitrum, polygonMumbai, mainnet]}
    >
      <CompoundSwitchNetwork>
        <CompoundSwitchNetwork.Option value={mainnet}>
          mainnet
        </CompoundSwitchNetwork.Option>
        <CompoundSwitchNetwork.Option value={goerli}>
          goerli
        </CompoundSwitchNetwork.Option>
        <CompoundSwitchNetwork.Option value={arbitrum}>
          arbitrum
        </CompoundSwitchNetwork.Option>
      </CompoundSwitchNetwork>
    </KitProvider>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Compound Comps/SwitchNetworks',
  component: Comp,
};

export default meta;
type Story = StoryObj<typeof Comp>;

export const Primary: Story = {
  args: {},
};
export const CustomStyling: Story = {
  render: () => <CustomStyleComp />,
};
