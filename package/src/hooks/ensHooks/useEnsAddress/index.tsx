import { Address } from 'viem';
import { usePublicClient } from '../../../components/KitProvider/KitProvider';
import { mainnet } from 'viem/chains';
import { useEffect, useMemo, useState } from 'react';
import { normalize } from 'path';
import { makeCancelable } from '../../../utils/makeCancelable';

interface UseEnsAddressProps {
  ensName: string;
}

interface UseEnsAddressReturn {
  address?: Address;
  fetching: boolean;
  error?: Error;
}

export const useEnsAddress = ({
  ensName,
}: UseEnsAddressProps): UseEnsAddressReturn => {
  const publicClient = usePublicClient()?.[mainnet.name];
  const [address, setAddress] = useState<Address>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (!ensName || ensName === '') return;

    if (!publicClient) {
      setError(new Error('No public client found'));
      return;
    }

    let isMounted = true;
    let cancelPreviousPromise: (() => void) | undefined;

    void (async () => {
      setAddress(undefined);
      setFetching(true);
      setError(undefined);

      try {
        const { promise, cancel } = makeCancelable(
          publicClient?.getEnsAddress({
            name: normalize(ensName),
          })
        );
        cancelPreviousPromise?.();
        cancelPreviousPromise = cancel;

        const ensAddress = await promise;
        if (isMounted) {
          setAddress(ensAddress as Address);
          setError(undefined);
        }
      } catch (error: unknown) {
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
  }, [ensName, publicClient]);

  return useMemo(() => ({ address, fetching, error }), [
    address,
    fetching,
    error,
  ]);
};
