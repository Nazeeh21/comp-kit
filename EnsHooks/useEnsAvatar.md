# useEnsAvatar

Returns avatar link for the ens

### Usage

```tsx
import { useEnsAvatar } from '@nazeeh2000/comp-kit'

const Comp = () => {
  const { avatar } = useEnsAvatar({
    ensName: 'wagmi-dev.eth'
  });

   return (
   // Your component
   )
}
```

### Return Values

```tsx
const { avatar, fetching, error } = useEnsAvatar({
  ensName: 'wagmi-dev.eth',
});
```
