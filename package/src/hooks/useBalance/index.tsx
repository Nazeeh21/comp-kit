import { useCallback, useState } from 'react';
import { GetBalanceParameters, formatEther } from 'viem';
import { usePublicClient } from '../../components/KitProvider/KitProvider';
export interface UseBalanceResult {
  getBalance: (args: GetBalanceParameters) => Promise<void>;
  etherBalance?: string;
  balance?: bigint;
  loading: boolean;
  error?: Error;
}

export const useBalance = (): UseBalanceResult => {
  const [balance, setBalance] = useState<bigint>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const publicClient = usePublicClient();

  const getBalance = useCallback(
    async ({ address, ...args }: GetBalanceParameters) => {
      setLoading(true);
      setError(undefined);
      try {
        const balance = await publicClient?.getBalance({ address, ...args });
        setBalance(balance);
      } catch (error) {
        setError(new Error(error as string));
      } finally {
        setLoading(false);
      }
    },
    [publicClient]
  );

  return {
    getBalance,
    etherBalance: balance ? formatEther(balance) : undefined,
    balance,
    loading,
    error,
  };
};
