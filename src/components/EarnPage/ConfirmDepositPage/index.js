import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Svg } from 'components/Svg';
import { Progress } from 'components/Progress';
import { Bill } from 'components/Bill';
import s from './s.module.css';

export default function ConfirmDepositPage() {
  return (
    <div className={s.wrap}>
      <div className={s.heading}>
        <h2 className={cn('typography-h2', s.title)}>
          Start a TBTC Earning Account
        </h2>
        <NavLink to="/earn" className={cn('button', 'secondary')}>
          switch to keep
        </NavLink>
        <Svg id="tbtc-right" width={70} height={49} className={s.headerIcon} />
      </div>
      <div className={s.container}>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>Wallet Assets</h3>
          <div className={s.walletAsset}>
            <div className="typography-h2">2.5 TBTC</div>
            <div className="typography-h5">$8500.00</div>
          </div>
          <div className={s.walletAsset}>
            <div className="typography-h2">10 ETH</div>
            <div className="typography-h5">$800.00</div>
          </div>
        </div>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>Confirm</h3>
          <Bill />
          <NavLink to="/" className={cn('button', 'secondary', s.button)}>
            complete deposit
          </NavLink>
        </div>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>
            Deposit Progress
          </h3>
          <Progress
            options={[
              { name: 'Start', description: 'Despoit ID: 1234•••9087' },
              {
                name: 'Deposit Size',
                description: '0.1 BTC > 0.09 TBTC\n0.255 ETH',
              },
              {
                name: 'Send BTC',
                description: '0x123456789012345678900098989786756447',
              },
              { name: 'BTC Block Confirmation' },
              { name: 'Prove Deposit' },
              { name: 'Complete' },
            ]}
            activeIndex={3}
          />
        </div>
      </div>
    </div>
  );
}
