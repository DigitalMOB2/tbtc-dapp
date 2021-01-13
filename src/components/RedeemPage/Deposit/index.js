import { useParams, NavLink } from 'react-router-dom';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import { Svg } from 'components/Svg';
import { Bill } from 'components/Bill';
import { DepositCard } from 'components/DepositCard';
import { Progress } from 'components/Progress';

import s from './s.module.css';

export default function Deposit() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  const searchId = nanoid();
  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Confirm</h2>
      </div>
      <label htmlFor={searchId} className={cn('typography-h5', s.searchLabel)}>
        Search or Paste Address
      </label>
      <div className={s.searchWrap}>
        <Svg id="search" className={s.searchIcon} />
        <input
          type="text"
          placeholder="Address"
          id={searchId}
          className={s.searchInput}
          readOnly
        />
      </div>

      <div className={s.container}>
        <div className={s.inner}>
          <DepositCard
            id="card1"
            name="Deposit #123456"
            level="default"
            amount="1.0 TBTC"
            className={s.depositCard}
            onSelect={() => null}
            selected
          />

          <Bill className={s.bill} />

          <div className={s.warn}>
            <Svg id="warning" width={15} height={15} />
            <p>
              The security cost of this Mint is 10% of your deposit. This is
              higher than average. A larger lot size is recommended or wait
              until transfer fees are lower.
            </p>
          </div>

          <div className={s.buttonsWrap}>
            <NavLink
              to={`/redeem/${address}/address`}
              className="button primary"
            >
              CONFIRM
            </NavLink>
          </div>
        </div>
        <div>
          <h2 className={cn('typography-h5', s.subTitle)}>
            Redemption Progress
          </h2>
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
