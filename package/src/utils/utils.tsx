import * as chains from 'viem/chains';
import { usePublicClient } from '../components/KitProvider/KitProvider';
import { useEffect, useState } from 'react';

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
  }
  throw new Error(`Chain with id ${chainId} not found`);
}

export function useCurrentChain(): chains.Chain | undefined {
  const [currentChain, setCurrentChain] = useState<chains.Chain | undefined>();
  const publicClient = usePublicClient();

  useEffect(() => {
    const fetchChain = async () => {
      const block = await publicClient?.getChainId();
      setCurrentChain(getChain(block || 0));
      return;
    };
    void fetchChain();
  }, [publicClient]);

  return currentChain;
}
