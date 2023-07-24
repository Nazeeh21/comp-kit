import { useEffect, useState } from 'react';
import { Chain } from 'viem';
import { bsc, mainnet, polygon, polygonMumbai } from 'viem/chains';

const nativeTokens: Record<string, string> = {
  [mainnet.id]: 'ETH',
  [bsc.id]: 'BNB',
  [polygon.id]: 'MATIC',
  [polygonMumbai.id]: 'MATIC',
};

export function useGetNativeToken({ chain }: { chain: Chain }) {
  const [nativeToken, setNativeToken] = useState('ETH');
  useEffect(() => {
    if (nativeTokens[chain.id]) {
      setNativeToken(nativeTokens[chain.id]);
    }
  }, [chain]);
  return {
    nativeToken,
  };
}
