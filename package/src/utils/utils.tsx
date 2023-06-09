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
