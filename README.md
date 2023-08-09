# Comp-kit

Comp-kit is a React component library for web3 built on top of [viem](https://viem.sh/). It provides ready-to-use as well as reusable components built using [stitches](https://stitches.dev/). Apart from that, it offers a collection of React hooks that provide you with everything you need to get started with Ethereum.

> Note: You can refer to the docs here Refer to the docs [here](https://nazeehs-org.gitbook.io/comp-kit/)

## Installation

Install `comp-kit` and its peer dependencies. I am using `yarn` as the package manager, you can use the package manager of your choice.

```bash
yarn add @nazeeh2000/comp-kit viem @stitches/react @walletconnect/modal @walletconnect/ethereum-provider
```

## Configuration

Once you're done with the installation of the dependencies, you need to wrap your app with the `KitProviser` wrapper imported from the `@nazeeh2000/comp-kit` package.

```tsx
'use client';
import { KitProvider } from '@nazeeh2000/comp-kit';
import './globals.css';
import { Inter } from 'next/font/google';
import { arbitrum, mainnet, polygon } from 'viem/chains';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <KitProvider
          projectId="" // WallectConnect projectId
          supportedChains={[mainnet, polygon, arbitrum]}
        >
          {children}
        </KitProvider>
      </body>
    </html>
  );
}
```

## Usage

### Public Client

In order to use `publicClient`, import `usePublicClient` from "@nazeeh2000/comp-kit". The return value of this hook will be a `Record` containing the `publicClient` corresponding to the network name.

You can use `publicClient` in your component as per the below example.

```tsx
'use client'
import { usePublicClient } from "@nazeeh2000/comp-kit";
import { mainnet } from "viem/chains";

export default function Home() {
    const publicClient = usePublicClient();
    // publicClient for mainnet
    const mainnetPublicClient = publicClient[mainnet.name]

    return (
    // Your component
    )
}
```

### WalletClient

In order to use `walletClient`, import `useWalletClient` from "@nazeeh2000/comp-kit". The return value of this hook will be `walletClient` that you can use in any part of your dapp.

You can use `walletClient` in your component as per the below example.

```tsx
'use client'
import { useWalletClient } from "@nazeeh2000/comp-kit";

export default function Home() {
    const walletClient = useWalletClient();

    return (
    // Your component
    )
}
```

### Readymade Component

In order to use Ready to use components, refer to the guide [here](./ReadymadeComponent.md)

### Compound Component

In order to use Compound and Ready to use components, refer to the guide [here](./CompoundComponent.md)

### Hooks

There are mainly 2 hooks provided by the `comp-kit` to access data regarding the account and network.

- [`useAccount`](./useAccount.md)
- [`useChain`](./useChain.md)
- [`useBalance`](./useBalance.md)

#### ENS Hooks

- [`useENSName`](./useEnsName.md)
- [`useENSAddress`](./useEnsAddress.md)
- [`useEnsAvatar`](./useEnsAvatar.md)
