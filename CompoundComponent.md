# Compound Components

These components are reusable and customizable compound components.

### Connect Button

This component provides the same functionality as the one from _Readymade Components_. The difference here is in the way of implementation.

### Usage

```tsx
'use client';
import { ConnectButtonPrimitive } from '@nazeeh2000/comp-kit';

export default function Home() {
  return (
    <>
      <ConnectButtonPrimitive>
        <ConnectButtonPrimitive.Button>
          Compound Connect Button
        </ConnectButtonPrimitive.Button>
        <ConnectButtonPrimitive.Modal
          closeOnOverlayClick={true}
          style={
            {
              /* YOUR CUSTOM STYLES */
            }
          }
          closeButtonProps={{
            style: {
              /* YOUR CUSTOM STYLES FOR CLOSE BUTTON */
            },
          }}
        >
          <ConnectButtonPrimitive.MetaMaskButton
            style={{ background: 'yellow' }}
          >
            Metamask
          </ConnectButtonPrimitive.MetaMaskButton>
          <ConnectButtonPrimitive.WalletConnect
            style={{ background: 'yellow' }}
          >
            WalletConnect
          </ConnectButtonPrimitive.WalletConnect>
        </ConnectButtonPrimitive.Modal>
        <ConnectButtonPrimitive.DisconnectButton>
          Disconnect Wallet
        </ConnectButtonPrimitive.DisconnectButton>
      </ConnectButtonPrimitive>
    </>
  );
}
```

### Connect with Disconnect button

You can use the combination of `Compound Connect` and `Disconnect` buttons to achieve the complete user flow of the wallet connection.

### Usage

```tsx
'use client';
import { ConnectButtonPrimitive, useAccount } from '@nazeeh2000/comp-kit';

export default function Home() {
  const { address, isConnected } = useAccount();
  return (
    <>
      <ConnectButtonPrimitive>
        {isConnected && address ? (
          <>
            <div>Connected address: {address?.[0].toString()}</div>
            <ConnectButtonPrimitive.DisconnectButton
              style={{ background: '#333', color: 'white', opacity: 0.9 }}
            >
              Disconnect Wallet
            </ConnectButtonPrimitive.DisconnectButton>
          </>
        ) : (
          <>
            <ConnectButtonPrimitive.Button>
              Compound Connect Button
            </ConnectButtonPrimitive.Button>
            <ConnectButtonPrimitive.Modal
              heading="Custom Connect Wallet"
              closeOnOverlayClick={true}
              style={{ background: '#333', color: 'white', opacity: 0.9 }}
              closeButtonProps={{
                style: {
                  background: '#ccc',
                  color: 'black',
                  border: '1.5px solid black',
                },
              }}
            >
              <ConnectButtonPrimitive.MetaMaskButton
                style={{
                  background: '#2c97de',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Metamask
              </ConnectButtonPrimitive.MetaMaskButton>
              <ConnectButtonPrimitive.WalletConnect
                style={{
                  background: '#2c97de',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                WalletConnect
              </ConnectButtonPrimitive.WalletConnect>
            </ConnectButtonPrimitive.Modal>
          </>
        )}
      </ConnectButtonPrimitive>
    </>
  );
}
```

### Switch Network

This component also provides the same functionality as the one from _Readymade Components_. The only difference here is in the way of implementation.

### Usage

```tsx
'use client';
import { SwitchNetworkWrapper } from '@nazeeh2000/comp-kit';
import { arbitrum, goerli, mainnet, polygonMumbai } from 'viem/chains';

export default function Home() {
  return (
    <>
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
    </>
  );
}
```

> Note: Make sure your app is wrapped with the necessary provider [`KitProvider`](./README.md#kitprovider).
