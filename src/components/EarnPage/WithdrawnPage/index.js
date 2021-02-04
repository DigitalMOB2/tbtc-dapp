import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Svg } from 'components/Svg';
import s from './s.module.css';

export default function WithdrawnPage() {
  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Account #12345</h2>
        <NavLink to="/earn" className={s.closeButton}>
          <Svg id="close-circle" width={24} height={24} />
        </NavLink>
      </div>
      <div className={s.container}>
        <Svg id="tbtc-right" width={72} height={50} />
        <div className={cn('typography-h2', s.complete)}>Complete!</div>
        <div className={s.currency}>
          10000.324534 <span className={s.thin}>TBTC</span>
        </div>
        <div className={s.principle}>10000.245 Principle</div>
      </div>
    </div>
  );
}
