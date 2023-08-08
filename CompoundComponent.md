# Compound Components
These components are reusable and customizable compound components.

### Connect Button
This component provides the same functionality as the one from *Readymade Components*. The difference here is in the way of implementation. 

### Usage
```tsx
"use client";
import { ConnectButtonPrimitive } from "@nazeeh2000/comp-kit";

export default function Home() {
  return (
    <>
      <ConnectButtonPrimitive>
        <ConnectButtonPrimitive.Button>
          Compound Connect Button
        </ConnectButtonPrimitive.Button>
        <ConnectButtonPrimitive.Modal
          closeOnOverlayClick={true}
          style={{ /* YOUR CUSTOM STYLES */ }}
          closeButtonProps={{ style: { /* YOUR CUSTOM STYLES FOR CLOSE BUTTON */ } }}
        >
          <ConnectButtonPrimitive.MetaMaskButton
            style={{ background: "yellow" }}
          >
            Metamask
          </ConnectButtonPrimitive.MetaMaskButton>
          <ConnectButtonPrimitive.WalletConnect
            style={{ background: "yellow" }}
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
### Switch Network
This component also provides the same functionality as the one from *Readymade Components*. The only difference here is in the way of implementation.

### Usage
```tsx
"use client";
import { SwitchNetworkWrapper } from "@nazeeh2000/comp-kit";
import { arbitrum, goerli, mainnet, polygonMumbai } from "viem/chains";

export default function Home() {
  return (
    <>
      <SwitchNetworkWrapper style={{ background: "cyan" }}>
        <SwitchNetworkWrapper.Option
          style={{ border: "2px solid cyan", background: "red" }}
          value={mainnet}
        >
          mainnet 1
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option value={goerli}>
          goerli 2
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option css={{ color: "blue" }} value={arbitrum}>
          arbitrum 3
        </SwitchNetworkWrapper.Option>
        <SwitchNetworkWrapper.Option
          css={{ color: "blue" }}
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