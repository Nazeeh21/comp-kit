# useAccount
This hook provides data regarding the connected account. 
### Usage
```tsx
import {useAccount } from '@nazeeh2000/comp-kit'

const Comp = () => {
  const { address, isConnected } = useAccount();
  
  return (
  // Your component
  )
}
```

### Return Values
```tsx
const {
      address,
      connecting,
      error,
      status, // 'connecting' | 'connected' | 'disconnected' | 'error'
      isConnected,
      disconnectWallet,
      walletProvider, // shows which wallet provider is connected e.g. MetaMask or WalletConnect
} = useAccount()
```