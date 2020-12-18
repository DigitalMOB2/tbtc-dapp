import { createContext, useEffect, useState, useContext, useRef } from 'react';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
// import { Web3Provider } from '@ethersproject/providers';
import Web3 from 'web3';
import { useSessionStorage } from 'react-use-storage';

import { connectors } from './connectors';
// import { useEagerConnect, useInactiveListener } from 'hooks/connect';
// import { useBalance, useBlockNumber } from 'hooks/wallet';
import { getErrorMessage } from 'utils/wallet';
import { useGeneral } from 'context/general';

/** @enum {string} */
const statusTypes = {
  connected: 'connected',
  activating: 'activating',
  disconnected: 'disconnected',
};

export const WalletContext = createContext({
  /** @type {number|undefined} */
  chainId: undefined,
  /** @type {string|null|undefined} */
  account: null,
  /** @type {statusTypes} */
  status: statusTypes.disconnected,
  /** @type {import('@web3-react/abstract-connector').AbstractConnector | undefined} */
  connector: undefined,
  /** @type {boolean} */
  active: false,
  /** @type {Error|undefined} */
  error: undefined,
  /** @type {Web3|undefined} */
  web3: undefined,
  /** @type {Web3|undefined} */
  provider: undefined,

  /** @type {Function} */
  injected: () => null,
  /** @type {Function} */
  ledger: () => null,
  /** @type {Function} */
  disconnect: () => null,
});

export function WalletProvider({ children }) {
  const {
    notifications: { addNotification },
  } = useGeneral();

  const [connectionStatus, setConnectionStatus] = useState({
    loading: false,
    loaded: false,
  });

  /** @type {[Object, React.Dispatch<React.SetStateAction<Object|undefined>>]} */
  const [provider, setProvider] = useState();

  const web3React = useWeb3React();
  const {
    connector,
    chainId,
    account,
    active,
    error,
    library,
    activate,
    deactivate,
  } = web3React;
  // console.log({ web3React });
  window.web3React = web3React;

  const [
    sessionProvider,
    setSessionProvider,
    removeSessionProvider,
  ] = useSessionStorage('wallet_provider');

  const connect = (name) => {
    const CHAIN_ID = Number(process.env.REACT_APP_WEB3_CHAIN_ID);

    const currentConnector = connectors[name](CHAIN_ID);

    if (!currentConnector) {
      console.log(`Connector ${name} not found`);
      return;
    }

    setConnectionStatus((prevConnectionStatus) => ({
      ...prevConnectionStatus,
      loading: true,
    }));

    activate(currentConnector, undefined, true)
      .then(() => {
        // console.log({ currentConnector });
        setSessionProvider(name);
        currentConnector.getProvider().then(setProvider);
      })
      .catch((error) => {
        console.log({ error });
        addNotification(getErrorMessage(error), { level: 'error' });
      })
      .finally(() => {
        setConnectionStatus((prevConnectionStatus) => ({
          ...prevConnectionStatus,
          loading: false,
          loaded: true,
        }));
      });
  };

  const disconnect = () => {
    deactivate();
    removeSessionProvider();
  };

  const connectRef = useRef(connect);
  connectRef.current = connect;
  useEffect(() => {
    const lastConnectedConnector = connectors[sessionProvider];

    if (lastConnectedConnector) {
      connectRef.current(sessionProvider);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const errorMessage = getErrorMessage(error);
      console.log({ error });
      if (errorMessage) addNotification(errorMessage, { level: 'error' });
    }
  }, [error, addNotification]);

  let status = statusTypes.disconnected;
  if (connectionStatus.loading) {
    status = statusTypes.activating;
  } else if (connector) {
    status = statusTypes.connected;
  }

  return (
    <WalletContext.Provider
      value={{
        active,
        error,
        chainId,
        account,
        status,
        connector,
        web3: library,
        provider,
        // connectionStatus,

        injected: () => connect('injected'),
        ledger: () => connect('ledger'),
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

function getLibrary(provider) {
  // const library = new Web3Provider(provider);
  // library.pollingInterval = 8000;
  // return library;
  return new Web3(provider);
}

export function ConnectedWalletProvider({ children }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletProvider>{children}</WalletProvider>
    </Web3ReactProvider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
