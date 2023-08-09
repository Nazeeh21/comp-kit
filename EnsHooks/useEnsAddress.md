# useEnsAddress

This hook will return the resolved address by taking ens as a parameter

### Usage

```tsx
import { useEnsAddress } from '@nazeeh2000/comp-kit'

const Comp = () => {
  const { address } = useEnsAddress({ ensName: "wagmi-dev.eth" });

  return (
  // Your component
  )
};
```

### Return Values

```tsx
const { address, fetching, error } = useEnsAddress({
  ensName: 'wagmi-dev.eth',
});
```
