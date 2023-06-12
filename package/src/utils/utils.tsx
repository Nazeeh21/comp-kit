import { Address } from 'viem';
import * as chains from 'viem/chains';

/**
 * Gets the chain object for the given chain id.
 * @param chainId - Chain id of the target EVM chain.
 * @returns Viem's chain object.
 */
export function getChain(chainId: number): chains.Chain {
  for (const chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain;
    }
    if (chainId === 0) return chains.mainnet;
  }
  throw new Error(`Chain with id ${chainId} not found`);
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
