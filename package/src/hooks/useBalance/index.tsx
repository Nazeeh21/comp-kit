import { useCallback, useEffect, useState } from 'react';
import { Address } from 'viem';
import { usePublicClient } from '../../components/KitProvider/KitProvider';

export interface UseBalanceResult {
  balance?: bigint;
  loading: boolean;
  error?: Error;
}

export interface useBalanceProps {
  address: Address;
}

export const useBalance = ({ address }: useBalanceProps): UseBalanceResult => {
  const [balance, setBalance] = useState<bigint>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const publicClient = usePublicClient();

  const getBalance = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const balance = await publicClient?.getBalance({ address });
      setBalance(balance);
    } catch (error) {
      setError(new Error(error as string));
    } finally {
      setLoading(false);
    }
  }, [publicClient, address]);

  useEffect(() => {
    void getBalance();
  }, []);

  return {
    balance,
    loading,
    error,
  };
};
