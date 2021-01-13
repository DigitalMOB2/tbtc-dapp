import { Switch, Route, Redirect } from 'react-router-dom';

import DepositsPage from 'components/RedeemPage/Deposits';
import DepositPage from 'components/RedeemPage/Deposit';
import AddressPage from 'components/RedeemPage/Address';
import ConfirmationPage from 'components/RedeemPage/Confirmation';
import DonePage from 'components/RedeemPage/Done';

export default function MintPage() {
  return (
    <Switch>
      <Route exact path="/redeem" component={DepositsPage} />
      <Route exact path="/redeem/:address" component={DepositPage} />
      <Route path="/redeem/:address/address" component={AddressPage} />
      <Route
        path="/redeem/:address/confirmation"
        component={ConfirmationPage}
      />
      <Route path="/redeem/:address/done" component={DonePage} />
      <Redirect to="/redeem" />
    </Switch>
  );
}
