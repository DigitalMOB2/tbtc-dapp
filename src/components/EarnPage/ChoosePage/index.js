import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Svg } from 'components/Svg';
import s from './s.module.css';

export default function ChoosePage() {
  return (
    <div className={s.wrap}>
      <h2 className={cn('typography-h2', s.title)}>
        Choose how you want to earn.
      </h2>
      <div className={s.container}>
        <div className={s.card}>
          <h3 className={cn('typography-h3', s.cardTitle)}>Earn in TBTC</h3>
          <div className={s.currencyIcons}>
            <Svg id="tbtc-left" width={40} height={28} />
            <Svg
              id="arrow-right-currency"
              width={22}
              height={38}
              className={s.currencyArrow}
            />
            <Svg id="tbtc-right" width={41} height={28} />
          </div>
          <div className={cn(s.currency, s.orange)}>20% APY</div>
          <div className={s.fee}>With No-fee Reinvesting</div>
          <NavLink
            to="/earn/cards"
            className={cn('button', 'primary', s.button)}
          >
            join tbtc pool
          </NavLink>
        </div>
        <div className={s.card}>
          <h3 className={cn('typography-h3', s.cardTitle)}>Earn in KEEP</h3>
          <div className={s.currencyIcons}>
            <Svg id="tbtc-left" width={40} height={28} />
            <Svg
              id="arrow-right-currency"
              width={22}
              height={38}
              className={s.currencyArrow}
            />
            <Svg id="keep-right" width={41} height={28} />
          </div>
          <div className={cn(s.currency, s.green)}>99% APY</div>
          <NavLink
            to="/earn/cards"
            className={cn('button', 'primary', s.button)}
          >
            join keep pool
          </NavLink>
        </div>
      </div>
      <div className={s.warn}>
        <Svg id="warning" width={15} height={15} /> Please connect a wallet to
        see active pools.
      </div>
    </div>
  );
}
