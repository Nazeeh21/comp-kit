import { useEffect, useMemo, useState } from 'react';
import { usePublicClient } from '../../../components/KitProvider/KitProvider';
import { mainnet } from 'viem/chains';
import { makeCancelable } from '../../../utils/makeCancelable';
import { normalize } from 'path';

interface UseEnsAvatarProps {
  ensName: string;
}

export const useEnsAvatar = ({ ensName }: UseEnsAvatarProps) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const publicClient = usePublicClient()?.[mainnet.name];

  useEffect(() => {
    if (!ensName || ensName === '') return;

    if (!publicClient) {
      setError(new Error('No public client found'));
      return;
    }

    let isMounted = true;
    let cancelPreviousPromise: (() => void) | undefined;

    void (async () => {
      setAvatar(null);
      setFetching(true);
      setError(undefined);
      try {
        const { promise, cancel } = makeCancelable(
          publicClient.getEnsAvatar({
            name: normalize(ensName),
          })
        );
        cancelPreviousPromise?.();
        cancelPreviousPromise = cancel;

        const avatar = await promise;
        if (isMounted) {
          setAvatar(avatar);
          setError(undefined);
        }
      } catch (error: unknown) {
        console.log('Error while fetching ensAvatar: ', error);
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

  return useMemo(
    () => ({
      avatar,
      fetching,
      error,
    }),
    [avatar, fetching, error]
  );
};
