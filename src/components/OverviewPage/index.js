import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import s from './s.module.css';
import bg from './bg.png';

export default function OverviewPage() {
  return (
    <div className={s.page} style={{ backgroundImage: `url(${bg})` }}>
      <h1 className={cn('typography-h1', s.heading)}>A match made in DeFi.</h1>
      <div className={s.container}>
        <div className={s.block}>
          <svg
            width="104"
            height="104"
            className={s.image}
            style={{ marginTop: 7 }}
          >
            <use xlinkHref="/sprite.svg#ink" />
          </svg>
          <NavLink to="/mint" className={cn('button', 'primary', s.button)}>
            mint tbtc &#8594;
          </NavLink>
          <div className={cn('typography-h6', s.hint)}>
            <div className={s.progressBar} style={{ '--width': '30%' }} />
            100 TBTC CAP
          </div>
        </div>
        <div className={s.block}>
          <svg width="104" height="111" className={s.image}>
            <use xlinkHref="/sprite.svg#redeem-bitcoin" />
          </svg>
          <NavLink to="/redeem" className={cn('button', 'primary', s.button)}>
            redeem btc &#8594;
          </NavLink>
          <div className={cn('typography-h6', s.hint)}>
            1,200,000 TBTC market
          </div>
        </div>
      </div>
    </div>
  );
}
