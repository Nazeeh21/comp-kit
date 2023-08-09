# useChain

This hook provides data regarding the current user network and all the supported chains the user has passed to the `KitProvider` wrapper.

### Usage

```tsx
import { useChain } from '@nazeeh2000/comp-kit'

const Comp = () => {
   const { currentChain } = useChain();

  return (
  // Your component
  )
}
```

### Return Values

```tsx
const {
  currentChain,
  supportedChains, // returns an array of Chains of type Chain[]
} = useChain();
```
