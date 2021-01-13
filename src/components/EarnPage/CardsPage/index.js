import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import s from './s.module.css';

export default function CardsPage() {
  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.heading}>
          <h2 className={s.pool}>
            Pool #12345
            <br />
            <span className={s.apy}>Earning TBTC @ 20% APY</span>
          </h2>
          <NavLink to="/earn/withdraw" className={cn('button', 'secondary')}>
            withdraw
          </NavLink>
        </div>
        <div className={cn(s.currency, s.orange)}>10000.324534 TBTC</div>
        <div className={s.principle}>10000.00 Principle</div>
        <NavLink
          to="/earn/deposit"
          className={cn('button', 'primary', s.investButton)}
        >
          re-invest earings
        </NavLink>
      </div>
      <div className={s.card}>
        <div className={s.heading}>
          <h2 className={s.pool}>
            Pool #12345
            <br />
            <span className={s.apy}>Earning TBTC @ 20% APY</span>
          </h2>
          <NavLink to="/earn/withdraw" className={cn('button', 'secondary')}>
            withdraw
          </NavLink>
        </div>
        <div className={cn(s.currency, s.green)}>10000.324534 TBTC</div>
        <div className={s.principle}>10000.00 Principle</div>
        <NavLink
          to="/earn/deposit"
          className={cn('button', 'primary', s.investButton)}
        >
          re-invest earings
        </NavLink>
      </div>
    </div>
  );
}
