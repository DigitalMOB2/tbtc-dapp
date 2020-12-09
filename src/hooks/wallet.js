import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';

// fetch eth balance of the connected account
export function useBallance() {
  const web3React = useWeb3React();
  const { library, chainId, account } = web3React;

  const [ethBalance, setEthBalance] = useState();
  useEffect(() => {
    // console.log('running');
    if (library && account) {
      let stale = false;

      library
        .getBalance(account)
        .then((balance) => {
          if (!stale) {
            setEthBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setEthBalance(null);
          }
        });

      return () => {
        stale = true;
        setEthBalance(undefined);
      };
    }
  }, [library, account, chainId]);

  return ethBalance;
}

export function useBlockNumber() {
  const web3React = useWeb3React();
  const { library, chainId } = web3React;
  // set up block listener
  const [blockNumber, setBlockNumber] = useState();
  useEffect(() => {
    console.log('running');
    if (library) {
      let stale = false;

      console.log('fetching block number!!');
      library
        .getBlockNumber()
        .then((blockNumber) => {
          if (!stale) {
            setBlockNumber(blockNumber);
            console.log({ blockNumber });
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(null);
          }
        });

      const updateBlockNumber = (blockNumber) => {
        setBlockNumber(blockNumber);
      };
      library.on('block', updateBlockNumber);

      return () => {
        library.removeListener('block', updateBlockNumber);
        stale = true;
        setBlockNumber(undefined);
      };
    }
  }, [library, chainId]);
  return blockNumber;
}
