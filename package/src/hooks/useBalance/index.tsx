import { useEffect, useMemo, useState } from 'react';
import { GetBalanceParameters, formatEther } from 'viem';
import { mainnet } from 'viem/chains';
import { useCurrentChain } from '../../components/KitProvider/ChainContext';
import { usePublicClient } from '../../components/KitProvider/KitProvider';
import { makeCancelable } from '../../utils/makeCancelable';
import { useEnsAddress } from '../ensHooks/useEnsAddress';

export interface UseBalanceResult {
  etherBalance?: string;
  balance?: bigint;
  fetching: boolean;
  error?: Error;
}

export const useBalance = ({ address, ...args }: GetBalanceParameters) => {
  const [balance, setBalance] = useState<bigint>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const currentChain = useCurrentChain();
  const _publicClient = usePublicClient();
  const { address: ensAddress } = useEnsAddress({ ensName: address });

  useEffect(() => {
    const publicClient = _publicClient?.[currentChain?.name ?? mainnet.name];

    if (!address || address === '0x0')
      // address is not of the type Address
      return;

    if (!publicClient) {
      console.log('No public client found', { publicClient });
      setError(
        new Error('No public client found or this chain is not supported')
      );
      return;
    }

    let isMounted = true;
    let cancelPreviousPromise: (() => void) | undefined;

    void (async () => {
      setBalance(undefined);
      setFetching(true);
      setError(undefined);

      try {
        const { promise, cancel } = makeCancelable(
          publicClient?.getBalance({
            address: ensAddress ?? address,
            ...args,
          })
        );
        cancelPreviousPromise?.();
        cancelPreviousPromise = cancel;

        const balance = await promise;
        if (isMounted) {
          setBalance(balance);
          setError(undefined);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setError(new Error(error as string));
        }
      } finally {
        if (isMounted) {
          setFetching(false);
        }
      }
    })();

    return () => {
      isMounted = false;
      cancelPreviousPromise?.();
    };
  }, [currentChain, _publicClient, address, ensAddress]);

  return useMemo(
    () => ({
      balance,
      fetching,
      error,
      etherBalance: balance ? formatEther(balance) : undefined,
    }),
    [balance, fetching, error]
  );
};
