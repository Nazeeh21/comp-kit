# useBalance

Returns the account balance for the current chain.

### Usage

```tsx
import { useBalance } from '@nazeeh2000/comp-kit'

const Comp = () => {
 const { balance, fetching, error, etherBalance } = useBalance({
    address,
    // all the other parameters you can pass to `getBalance` from viem
    // example: blockTag: 'latest'
  });

  return (
  // Your component
  )
}
```

> Note: You can pass all the parameters from [getBalance](https://viem.sh/docs/actions/public/getBalance.html#parameters) hook of viem to the above useBalance hook.
