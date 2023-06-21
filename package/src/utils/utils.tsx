import { Address } from 'viem';
import * as chains from 'viem/chains';
import { requestObject } from '../components/test/utils';

declare global {
  interface Window {
    ethereum: {
      off(arg0: string, handleChainChanged: (chainId: string) => void): unknown;
      on(arg0: string, arg1: (chainId: string) => void): unknown;
      enable(): unknown;
      request: typeof requestObject;
    };
  }
}

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
export function getChain(chainId: number): chains.Chain | undefined {
  try {
    for (const chain of Object.values(chains)) {
      if (chain.id === chainId) {
        return chain;
      }
      if (chainId === 0) return chains.mainnet;
    }
  } catch (error) {
    // this error indicates that the chain user has switched to is not supported by viem
    // TODO: handle this error using native error component
    throw new Error(`Chain with id ${chainId} not found in viem`);
  }
}

export function storePrevWallet(wallet: 'MetaMask' | 'WalletConnect') {
  localStorage.setItem('prevWallet', wallet);
}

export function getPrevWallet() {
  return localStorage.getItem('prevWallet');
}

export function removePrevWallet() {
  localStorage.removeItem('prevWallet');
}

interface PrevAccount {
  accounts: Address[];
  chain: chains.Chain;
}

export function storePrevAccount({ accounts, chain }: PrevAccount) {
  localStorage.setItem(
    'prevAccount',
    JSON.stringify({
      data: { accounts, chain },
    })
  );
}

export function getPrevAccount() {
  const prevAccount = localStorage.getItem('prevAccount');
  if (!prevAccount) return undefined;
  return JSON.parse(prevAccount) as { data: PrevAccount };
}

export function removePrevAccount() {
  localStorage.removeItem('prevAccount');
}
