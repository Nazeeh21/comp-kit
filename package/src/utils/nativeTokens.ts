import { useEffect, useState } from 'react';
import { Chain } from 'viem';
import {
  arbitrum,
  aurora,
  avalanche,
  bsc,
  celo,
  fantom,
  gnosis,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
  telos,
} from 'viem/chains';

const nativeTokens: Record<string, string> = {
  [mainnet.id]: 'ETH',
  [goerli.id]: 'ETH',
  [bsc.id]: 'BNB',
  [polygon.id]: 'MATIC',
  [polygonMumbai.id]: 'MATIC',
  [celo.id]: 'CELO',
  [sepolia.id]: 'SepoliaETH',
  [optimism.id]: 'ETH',
  [arbitrum.id]: 'ETH',
  [avalanche.id]: 'AVAX',
  [fantom.id]: 'FTM',
  [aurora.id]: 'ETH',
  [gnosis.id]: 'xDai',
  [telos.id]: 'TLOS',
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
