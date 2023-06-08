import { useEffect, useState } from 'react';
import * as chains from 'viem/chains';
import { useSupportedChains } from '../components/KitProvider/ChainContext';
import { usePublicClient } from '../components/KitProvider/KitProvider';

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

export function useCurrentChain(): chains.Chain | undefined {
  const [currentChain, setCurrentChain] = useState<chains.Chain | undefined>();
  const publicClient = usePublicClient();
  const supportedChains = useSupportedChains();

  useEffect(() => {
    const fetchChain = async () => {
      const block = await publicClient?.[supportedChains[0].name]?.getChainId();
      setCurrentChain(getChain(block || 0));
      return;
    };
    void fetchChain();
  }, [publicClient]);

  return currentChain;
}
