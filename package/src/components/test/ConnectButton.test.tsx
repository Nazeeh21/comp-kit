import React from 'react';
import renderer from 'react-test-renderer';
import { mainnet } from 'viem/chains';
import { ConnectButton, KitProvider } from '../../index';
import { requestObject } from './utils';

declare global {
  interface Window {
    ethereum: { request: typeof requestObject };
  }
}

describe('test ConnectButton', () => {
  // @ts-expect-error - we are mocking window object
  const window: Window = {
    ethereum: {
      request: requestObject,
    },
  };

  const Comp: React.FC = () => (
    <KitProvider initialChain={mainnet} supportedChains={[mainnet]}>
      <ConnectButton />
    </KitProvider>
  );
  it('renders ConnectButton', () => {
    const container = renderer.create(<Comp />).toJSON();
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
