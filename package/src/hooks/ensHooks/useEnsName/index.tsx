import { useEffect, useMemo, useState } from 'react';
import { Address } from 'viem';
import { usePublicClient } from '../../../components/KitProvider/KitProvider';
import { mainnet } from 'viem/chains';
import { makeCancelable } from '../../../utils/makeCancelable';

interface UseEnsNameProps {
  address: Address;
}

interface UseEnsNameReturn {
  ensName: string | null;
  fetching: boolean;
  error?: Error;
}

export const useEnsName = ({ address }: UseEnsNameProps): UseEnsNameReturn => {
  const publicClient = usePublicClient()?.[mainnet.name];
  const [ensName, setEnsName] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!address || address === '0x0') return;

    if (!publicClient) {
      console.log('No public client found', { publicClient });
      setError(new Error('No public client found'));
      return;
    }

    let isMounted = true;
    let cancelPreviousPromise: (() => void) | undefined;

    void (async () => {
      setEnsName(null);
      setFetching(true);
      setError(undefined);
      try {
        const { promise, cancel } = makeCancelable(
          publicClient.getEnsName({
            address,
          })
        );
        cancelPreviousPromise?.();
        cancelPreviousPromise = cancel;
        const ens = await promise;
        if (isMounted) {
          setEnsName(ens as string);
          setError(undefined);
        }
      } catch (error: unknown) {
        console.log('Error while fetching ensName: ', error);
        if (isMounted) {
          setError(error as Error);
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
  }, [address, publicClient]);

  return useMemo(
    () => ({
      ensName,
      fetching,
      error,
    }),
    [ensName, fetching, error]
  );
};
