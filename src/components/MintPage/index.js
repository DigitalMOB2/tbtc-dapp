import { createContext, useContext, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DepositPage from 'components/MintPage/DepositPage';
import SendPage from 'components/MintPage/SendPage';
import ConnectPage from 'components/MintPage/ConnectPage';

/**
 * @typedef {Object} TEvent
 * @property {string} address
 * @property {string} blockHash
 * @property {number} blockNumber
 * @property {string} event
 * @property {string} id
 * @property {number} logIndex
 * @property {Object} raw
 * @property {string} raw.data
 * @property {string[]} raw.topics
 * @property {boolean} removed
 * @property {Object} returnValues
 * @property {string} returnValues._depositContractAddress
 * @property {string} returnValues._keepAddress
 * @property {string} returnValues._timestamp
 * @property {string} signature
 * @property {string} transactionHash
 * @property {number} transactionIndex
 */

export const MintContext = createContext({
  /** @type {Object|undefined} */
  deposit: undefined,
  /** @type {React.Dispatch<React.SetStateAction<Object|undefined>>} */
  setDeposit: () => undefined,
  /** @type {Object.<string, TEvent>} */
  events: {},
  /** @type {React.Dispatch<React.SetStateAction<Object.<string, TEvent>|undefined>>} */
  setEvents: () => undefined,
});

export default function MintPage() {
  /** @type {[Object, React.Dispatch<React.SetStateAction<Object|undefined>>]} */
  const [deposit, setDeposit] = useState();
  /** @type {[Object.<string, TEvent>, React.Dispatch<React.SetStateAction<Object.<string, TEvent>>>]} */
  const [events, setEvents] = useState({});

  return (
    <MintContext.Provider
      value={{
        deposit,
        setDeposit,
        events,
        setEvents,
      }}
    >
      <Switch>
        <Route exact path="/mint" component={DepositPage} />
        <Route path="/mint/connect" component={ConnectPage} />
        <Route path="/mint/:address" component={SendPage} />
        <Redirect to="/" />
      </Switch>
    </MintContext.Provider>
  );
}

export function useMint() {
  return useContext(MintContext);
}
