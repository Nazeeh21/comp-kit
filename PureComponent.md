# Pure Components
Pure components are reusable, ready-to-use, and non-customizable components.

### Connect Button
This is the main button to connect your dapp with your wallet. This component is responsible for rendering **Connect button** when not connected and rendering the **connected address** and **Disconnect** Button if connected.

```tsx
"use client";
import { ConnectButton } from "@nazeeh2000/comp-kit";

export default function Home() {
  return (
    <>
      <ConnectButton />
    </>
  );
}
```
> Note: Make sure your app is wrapped with the necessary provider [`KitProvider`](./README.md#kitprovider).

### Switch Network 
This component will provide you with the Network selection dropdown with pre-filled values of chains provided in the `supportedChains` props of the `KitProvider`.

If the user is on a network that is not included in the `supportedChains` array, then it will show **Wrong Network** and will prompt the user to switch to any of the supported chains.

This dropdown will also display the current network status by displaying a green dot next to the current network, and if network switching is in progress or the user has yet to confirm from the wallet, it will display a yellow indicator next to the chain on which the user wishes to switch.

```tsx
"use client";
import { SwitchNetworks } from "@nazeeh2000/comp-kit";

export default function Home() {
  return (
    <>
      <SwitchNetworks />
    </>
  );
}
```

> Note: You can pass `variant` prop to both of these components whose value will be `light` or `dark` depending on the theme of your dapp.