import { createContext, useEffect, useState } from 'react';
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import {
  URI_AVAILABLE,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector';
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from '@web3-react/frame-connector';
import { Web3Provider } from '@ethersproject/providers';

import {
  injected,
  // network,
  walletconnect,
  // walletlink,
  ledger,
  // trezor,
  // frame,
  // fortmatic,
  // portis,
  // squarelink,
  // torus,
  // authereum
} from './connectors';
import { useEagerConnect, useInactiveListener } from 'hooks/connect';

const connectorsByName = {
  Injected: injected,
  // Network: network,
  // WalletConnect: walletconnect,
  // WalletLink: walletlink,
  Ledger: ledger,
  // Trezor: trezor,
  // Frame: frame,
  // Fortmatic: fortmatic,
  // Portis: portis,
  // Squarelink: squarelink,
  // Torus: torus,
  // Authereum: authereum
};

export const ConnectContext = createContext({
  values: {
    /** @type {number|undefined} */
    chainId: undefined,
    /** @type {string|null|undefined} */
    account: null,
  },
  actions: {
    /** @type {Function} */
    injected: () => null,
  },
});

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

export function ConnectProvider({ children }) {
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState();
  useEffect(() => {
    console.log('running');
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

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

  // fetch eth balance of the connected account
  const [ethBalance, setEthBalance] = useState();
  useEffect(() => {
    console.log('running');
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

  // log the walletconnect URI
  useEffect(() => {
    console.log('running');
    const logURI = (uri) => {
      console.log('WalletConnect URI', uri);
    };
    walletconnect.on(URI_AVAILABLE, logURI);

    return () => {
      walletconnect.off(URI_AVAILABLE, logURI);
    };
  }, []);

  const connect = (name) => {
    const currentConnector = connectorsByName[name];

    setActivatingConnector(currentConnector);
    activate(connectorsByName[name], undefined, true);
  };

  return (
    <ConnectContext.Provider
      value={{
        values: {
          active,
          error,
          chainId,
          account,
          ethBalance,
          // networkName: getNetworkName(chainId),
        },
        actions: {
          injected: () => connect('Injected'),
          deactivate,
        },
      }}
    >
      {children}
    </ConnectContext.Provider>
  );
}

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export function ConnectedWeb3ReactProvider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ConnectProvider>{children}</ConnectProvider>
    </Web3ReactProvider>
  );
}
