import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

import { Svg } from 'components/Svg';
import { Progress } from 'components/Progress';
import { Steps } from './Steps';
import { StatusIndicator } from 'components/StatusIndicator';
import s from './s.module.css';

export default function ConnectPage() {
  const [showWarn, setShowWarn] = useState(true);
  const [state, setState] = useState('done'); // 'confirming' | 'confirmed' | 'done';

  return (
    <div className={s.page}>
      <h2 className={cn('typography-h2', s.title)}>
        {state === 'confirming' ? 'Confirming Sent Bitcoin' : null}
        {state === 'confirmed' ? 'Confirmations Completed' : null}
        {state === 'done' ? 'Success! You’ve got TBTC.' : null}
      </h2>
      <div className={s.container}>
        <div className={s.content}>
          <StatusIndicator animate={state !== 'done'}>
            {state === 'done' ? <Svg id="ink" className={s.doneIcon} /> : null}
          </StatusIndicator>
          {state === 'confirming' || state === 'confirmed' ? (
            <Steps currentStepIdx={6} />
          ) : (
            <div className={s.amount}>
              <strong>0.09</strong> TBTC
            </div>
          )}
          {showWarn ? (
            <div className={s.warn}>
              <Svg id="warning" width={14} height={14} className={s.warnIcon} />
              <p>
                Never send BTC from an exchange.
                <br />
                Make sure to send the exact amount of BTC displayed.
              </p>
              <button
                type="button"
                className={s.closeWarnButton}
                onClick={() => setShowWarn(false)}
              >
                <span className="visually-hidden">Close warning</span>
                <Svg id="close-circle" width={14} height={14} />
              </button>
            </div>
          ) : null}
          <div className={s.buttonsWrap}>
            {state === 'confirming' ? (
              <>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary"
                >
                  see btc transaction ↗︎
                </a>
                <NavLink to="/" className="button primary" disabled>
                  claim tbtc
                </NavLink>
              </>
            ) : null}
            {state === 'confirmed' ? (
              <>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary"
                >
                  etherscan ↗︎
                </a>
                <NavLink to="/" className="button primary">
                  claim tbtc
                </NavLink>
              </>
            ) : null}
            {state === 'done' ? (
              <>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button secondary"
                >
                  new mint
                </a>
                <NavLink to="/" className="button primary">
                  start earning
                </NavLink>
              </>
            ) : null}
          </div>
          {state === 'confirmed' ? (
            <div className={s.timeRemaining}>
              <Svg id="warning" width={15} height={15} />
              Time remaining to claim: <strong>25 minutes!</strong>
            </div>
          ) : null}
        </div>
        <div>
          <h3 className={cn('typography-h5', s.subtitle)}>Mint Progress</h3>
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
          {state === 'done' ? (
            <button
              type="button"
              className={cn('button', 'primary', s.downloadButton)}
            >
              download pdf receipt ↓
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
