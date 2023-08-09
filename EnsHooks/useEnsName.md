# useEnsName

Returns the resolved ens name from the address

### Usage

```tsx
import { useEnsName } from '@nazeeh2000/comp-kit'

const Comp = () => {
  const { ensName, fetching, error } = useEnsName({
    address: "0xd2135CfB216b74109775236E36d4b433F1DF507B"
  });

  return (
  // Your component
  )
}
```

### Return Values

```tsx
const { ensName, fetching, error } = useEnsName({
  address: '0xd2135CfB216b74109775236E36d4b433F1DF507B',
});
```
