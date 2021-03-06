import { Redirect, Route, Switch } from 'react-router-dom';
import ChoosePage from './ChoosePage';
import DepositPage from './DepositPage';
import ConfirmDepositPage from './ConfirmDepositPage';
import CardsPage from './CardsPage';
import WithdrawPage from './WithdrawPage';
import ConfirmWithdrawPage from './ConfirmWithdrawPage';
import WithdrawnPage from './WithdrawnPage';

export default function EarnPage() {
  return (
    <Switch>
      <Route exact path="/earn" component={ChoosePage} />
      <Route exact path="/earn/cards" component={CardsPage} />
      <Route exact path="/earn/deposit" component={DepositPage} />
      <Route
        exact
        path="/earn/deposit/confirm"
        component={ConfirmDepositPage}
      />
      <Route exact path="/earn/withdraw" component={WithdrawPage} />
      <Route
        exact
        path="/earn/withdraw/confirm"
        component={ConfirmWithdrawPage}
      />
      <Route exact path="/earn/withdraw/done" component={WithdrawnPage} />

      <Redirect to="/earn" />
    </Switch>
  );
}
