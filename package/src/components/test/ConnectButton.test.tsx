import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { mainnet } from 'viem/chains';
import { ConnectButton, KitProvider } from '../../index';
import { requestObject } from './utils';

declare global {
  interface Window {
    ethereum: {
      on(arg0: string, arg1: (chainId: string) => void): unknown;
      enable(): unknown;
      request: typeof requestObject;
    };
  }
}

describe('test ConnectButton', () => {
  const Comp: React.FC = () => (
    <KitProvider
      projectId="5a13f1a5297da2cd768519079890e4fe"
      initialChain={mainnet}
      supportedChains={[mainnet]}
    >
      <ConnectButton />
    </KitProvider>
  );
  xit('renders ConnectButton', async () => {
    let container: unknown;
    await act(() => {
      container = renderer.create(<Comp />).toJSON();
    });
    expect(container).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
