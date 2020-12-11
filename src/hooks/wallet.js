import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import TBTC, { BitcoinHelpers } from '@keep-network/tbtc.js';

// fetch eth balance of the connected account
export function useBalance() {
  const web3React = useWeb3React();
  const { library, chainId, account } = web3React;

  const [ethBalance, setEthBalance] = useState();
  useEffect(() => {
    if (library && account) {
      let stale = false;

      library.eth
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

const config = {
  3: {
    server: 'electrumx-server.test.tbtc.network',
    port: 8443,
    protocol: 'wss',
  },
};

export function useTBTCContract() {
  /** @type {[TBTC|undefined, React.Dispatch<React.SetStateAction<TBTC|undefined>>]} */
  const [contract, setContract] = useState();
  const { active, library, chainId, connector } = useWeb3React();

  useEffect(() => {
    (async () => {
      if (active && library) {
        // // Initialise default account.
        // const accounts = await library.eth.getAccounts();
        // library.eth.defaultAccount = accounts[0];
        library.eth.defaultAccount = await connector.getAccount();

        let bitcoinNetwork;

        switch (chainId) {
          case 1:
            bitcoinNetwork = BitcoinHelpers.Network.MAINNET;
            break;
          case 3:
            bitcoinNetwork = BitcoinHelpers.Network.TESTNET;
            break;
          default:
            bitcoinNetwork = BitcoinHelpers.Network.TESTNET;
        }

        try {
          const tbtc = await TBTC.withConfig({
            web3: library,
            bitcoinNetwork,
            electrum: config[chainId],
          });

          setContract(tbtc);

          // TODO: drop lines inside condition below
          if (process.env.NODE_ENV === 'development') {
            console.log({ tbtc });
            window.tbtc = tbtc;
          }
        } catch (e) {
          console.error(e);
        }
      }
    })();
  }, [active, library]);

  return contract;
}
