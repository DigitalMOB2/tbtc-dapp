import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.css';

export default function ConfirmWithdrawPage() {
  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Withdrawing From Account #12345</h2>
      </div>
      <div className={s.container}>
        <div className={s.summary}>
          <h3 className={cn('typography-h5', s.subtitle)}>
            Earnings Available to Withdraw
          </h3>
          <div className={s.currency}>0.324534 TBTC</div>
          <div className={s.apy}>1000.00 TBTC Principle at 20% APY</div>
        </div>
        <div className={s.main}>
          <div className={s.details}>
            <dl className={s.dl}>
              <dt>Withdraw Total</dt>
              <dd>
                0.254 TBTC
                <div className={s.subItem}>~$1.00</div>
              </dd>
            </dl>
            <hr className={s.hr} data-label="re-investing" />
            <dl className={s.dl}>
              <dt>
                New Principle
                <div className={s.subItem}>Account #12345</div>
              </dt>
              <dd>
                0.254 TBTC
                <div className={s.subItem}>~$1.00</div>
              </dd>
            </dl>
          </div>
          <div className={s.buttonsWrap}>
            <NavLink
              to="/earn/withdraw"
              className={cn('button', 'secondary', s.button)}
            >
              Cancel
            </NavLink>
            <NavLink
              to="/earn/withdraw/done"
              className={cn('button', 'primary', s.button)}
            >
              Withdraw
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
