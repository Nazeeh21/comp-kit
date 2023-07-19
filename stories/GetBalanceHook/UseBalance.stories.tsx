import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Address } from 'viem';
import { Chain, arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';
import { KitProvider } from '../../package/src';
import { useCurrentChain } from '../../package/src/components/KitProvider/ChainContext';
import { useBalance } from '../../package/src/hooks/useBalance';

const Comp = ({ address }: { address: Address }) => {
  const { balance, fetching, error, etherBalance } = useBalance({
    address,
    blockTag: 'latest',
  });
  const currentChain = useCurrentChain();
  if (typeof window?.ethereum === 'undefined') return <>Window is undefined</>;
  return (
    <>
      {fetching && <div style={{ fontSize: '1rem' }}>Fetching...</div>}
      {balance && (
        <div>
          Balance for chain {currentChain?.name} : {Number(balance)}
        </div>
      )}
      {etherBalance && (
        <div>
          Ether Balance for chain {currentChain?.name} : {etherBalance}
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </>
  );
};

const meta: Meta<typeof Comp> = {
  title: 'Hooks/useBalance',
  component: Comp,
  decorators: [
    Story => {
      if (typeof window?.ethereum === 'undefined')
        return <div>window.ethereum is undefined</div>;
      return (
        <KitProvider
          projectId="5a13f1a5297da2cd768519079890e4fe"
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
    address: '0x0c12522fCDa861460BF1BC223eCa108144EE5Df4',
  },
};
