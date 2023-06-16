// Components
export { ConnectButton } from './components/ConnectButton/ConnectButton';
export {
  KitProvider,
  KitProviderProps,
  usePublicClient,
  useWalletClient,
} from './components/KitProvider/KitProvider';
export { SwitchNetworks } from './components/SwitchNetwork/SwitchNetwork';

// Compound components
export { ConnectButtonPrimitive } from './compoundComps/ConnectButton/ConnectButton';
export { SwitchNetworkWrapper } from './compoundComps/SwitchNetwork/SwitchNetwork';

// Hooks
export { useAccount } from './components/KitProvider/AddressContext';
export { useChain } from './components/KitProvider/ChainContext';
