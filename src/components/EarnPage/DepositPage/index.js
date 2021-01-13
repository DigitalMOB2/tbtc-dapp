import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { WalletContext } from 'context/wallet';

import { Svg } from 'components/Svg';
import { Progress } from 'components/Progress';
import s from './s.module.css';

export default function DepositPage() {
  const walletContext = useContext(WalletContext);
  const isConnected = !!(walletContext.active || walletContext.error);

  return (
    <div className={s.wrap}>
      <div className={s.heading}>
        <h2 className={cn('typography-h2', s.title)}>
          {isConnected ? 'Join a TBTC Earning Pool' : 'Join a Pool to Earn'}
        </h2>
        {isConnected ? (
          <NavLink to="/earn" className={cn('button', 'secondary')}>
            switch to keep
          </NavLink>
        ) : null}
        <Svg id="tbtc-right" width={70} height={49} className={s.headerIcon} />
      </div>
      <div className={s.container}>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>Wallet Assets</h3>
          {isConnected ? (
            <>
              <div className={s.walletAsset}>
                <div className="typography-h2">2.5 TBTC</div>
                <div className="typography-h5">$8500.00</div>
              </div>
              <div className={s.walletAsset}>
                <div className="typography-h2">10 ETH</div>
                <div className="typography-h5">$800.00</div>
              </div>
            </>
          ) : (
            <div>
              <p>
                Please connect a wallet to see your available balance and start
                earning.
              </p>
              <button type="button" className={cn('button', 'secondary')}>
                connect
              </button>
            </div>
          )}
        </div>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>
            Choose Deposit Amount
          </h3>
          <div className={s.inputWrap}>
            <input
              type="text"
              className={s.input}
              placeholder="0.0"
              disabled={!isConnected}
            />
            <div className={s.inputCurrency}>T฿TC</div>
          </div>
          {isConnected ? (
            <dl className={s.termsWrap}>
              <div className={s.terms}>Terms</div>
              <div className={s.termsRow}>
                <dt>APY</dt>
                <dd>35%</dd>
              </div>
              <div className={s.termsRow}>
                <dt>Earning Period</dt>
                <dd>6 Months</dd>
              </div>
            </dl>
          ) : null}
          <NavLink
            to="/earn/deposit/confirm"
            className={cn('button', 'secondary', s.button)}
            disabled={!isConnected}
          >
            confirm -->
          </NavLink>
        </div>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>Progress</h3>
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
