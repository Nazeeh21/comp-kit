import { Address } from 'viem';
import { usePublicClient } from '../../../components/KitProvider/KitProvider';
import { mainnet } from 'viem/chains';
import { useEffect, useState } from 'react';
import { normalize } from 'path';

interface UseEnsAddressProps {
  ensName: string;
}

interface UseEnsAddressReturn {
  address?: Address;
  fetching: boolean;
}

export const useEnsAddress = ({
  ensName,
}: UseEnsAddressProps): UseEnsAddressReturn => {
  const publicClient = usePublicClient()?.[mainnet.name];
  const [address, setAddress] = useState<Address>();
  const [fetching, setFetching] = useState<boolean>(false);

  useEffect(() => {
    void (async () => {
      setFetching(true);
      try {
        const ensAddress = await publicClient?.getEnsAddress({
          name: normalize(ensName),
        });
        setAddress(ensAddress as Address);
      } catch (error) {
        console.error('Error while fetching ensAddress: ', error);
      } finally {
        setFetching(false);
      }
    })();
  }, [ensName, publicClient]);

  return { address, fetching };
};
