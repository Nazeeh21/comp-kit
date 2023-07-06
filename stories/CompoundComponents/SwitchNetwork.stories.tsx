import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider, useChain } from '../../package/src';
import { SwitchNetworkWrapper } from '../../package/src/compoundComps/SwitchNetwork/SwitchNetwork';

import type { Chain } from 'viem';

const CustomStyleComp = () => {
  const { currentChain } = useChain();
  if (typeof window?.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <SwitchNetworkWrapper style={{ background: 'cyan' }}>
        <SwitchNetworkWrapper.Option
          style={{ border: '2px solid cyan', background: 'red' }}
          value={mainnet}
        >
          mainnet
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option value={goerli}>
          goerli
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option css={{ color: 'blue' }} value={arbitrum}>
          arbitrum
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option
          css={{ color: 'blue' }}
          value={polygonMumbai}
        >
          polygonMumbai
        </SwitchNetworkWrapper.Option>
      </SwitchNetworkWrapper>
      <div>currentChain: {currentChain?.name}</div>
    </div>
  );
};

const Comp = () => {
  const { currentChain } = useChain();

  if (typeof window?.ethereum === 'undefined')
    return <div>window.ethereum is undefined</div>;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <SwitchNetworkWrapper>
        <SwitchNetworkWrapper.Option value={mainnet}>
          mainnet
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option value={goerli}>
          goerli
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option value={arbitrum}>
          arbitrum
        </SwitchNetworkWrapper.Option>
      </SwitchNetworkWrapper>
      <div>currentChain: {currentChain?.name}</div>
    </div>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Compound Comps/SwitchNetworks',
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
export const CustomStyling: Story = {
  render: () => <CustomStyleComp />,
};
