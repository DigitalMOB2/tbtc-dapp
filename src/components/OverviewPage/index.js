import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './s.module.css';

export default function OverviewPage() {
  return (
    <div className={s.page}>
      <h2 className={cn('typography-h1', s.heading)}>A match made in DeFi.</h2>
      <div>
        <div>
          <NavLink to="/mint">mint tbtc --></NavLink>
        </div>
        <div>
          <NavLink to="/redeem">redeem btc --></NavLink>
        </div>
      </div>
    </div>
  )
}
