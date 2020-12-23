import { createContext, useContext, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import DepositPage from 'components/MintPage/DepositPage';
import SendPage from 'components/MintPage/SendPage';
import ConnectPage from 'components/MintPage/ConnectPage';

export const MintContext = createContext({
  /** @type {Object|undefined} */
  deposit: undefined,
  /** @type {React.Dispatch<React.SetStateAction<Object|undefined>>} */
  setDeposit: () => undefined,
});

export default function MintPage() {
  /** @type {[Object, React.Dispatch<React.SetStateAction<Object|undefined>>]} */
  const [deposit, setDeposit] = useState();

  return (
    <MintContext.Provider
      value={{
        deposit,
        setDeposit, // : setDepositHandler,
      }}
    >
      <Switch>
        <Route exact path="/mint" component={DepositPage} />
        <Route path="/mint/connect" component={ConnectPage} />
        <Route path="/mint/:address" component={SendPage} />
        <Redirect to="/mint" />
      </Switch>
    </MintContext.Provider>
  );
}

export function useMint() {
  return useContext(MintContext);
}
