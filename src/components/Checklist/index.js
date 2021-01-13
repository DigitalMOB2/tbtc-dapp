import { useState } from 'react';
import cn from 'classnames';

import { Svg } from '../Svg';
import s from './s.module.css';

export const Checklist = () => {
  const [show, setShow] = useState(true);

  if (!show) {
    return null;
  }

  const handlerClose = () => {
    setShow(false);
  };

  return (
    <div className={s.wrap}>
      <button type="button" onClick={handlerClose} className={s.closeButton}>
        <Svg id="close-circle" width={18} height={18} />
      </button>
      <h2 className={cn('typography-h2', s.title)}>Checklist</h2>
      <div className={s.content}>
        <div className={s.listWrap}>
          <h5 className={cn('typography-h5', s.listTitle)}>
            What you should have on hand:
          </h5>
          <ul className={s.list}>
            <li>
              <Svg
                id="browser"
                width={14}
                height={14}
                style={{ color: 'var(--color-mint)' }}
              />
              <span>Web3-compatible browser</span>
            </li>
            <li>
              <Svg
                id="bitcoin"
                width={14}
                height={15}
                style={{ color: 'var(--color-pumpkin)' }}
              />
              <span>Bitcoin wallet</span>
            </li>
            <li>
              <Svg
                id="eth"
                width={14}
                height={14}
                style={{ color: 'var(--color-light-slate-blue)' }}
              />
              <span>Have approximately XXETH to sign transactions</span>
            </li>
          </ul>
          <a href="#" rel="noopener noreferrer" className={s.link}>
            Recommended wallets ↗
          </a>
        </div>
        <div className={s.listWrap}>
          <h5 className={cn('typography-h5', s.listTitle)}>
            What you should expect:
          </h5>
          <ul className={s.list}>
            <li>
              <Svg
                id="time"
                width={14}
                height={14}
                style={{ color: 'var(--color-mint)' }}
              />
              <span>
                You should be near this computer 2 hours to complete minting
                steps
              </span>
            </li>
            <li>
              <Svg
                id="sign"
                width={14}
                height={14}
                style={{ color: 'var(--color-mint)' }}
              />
              <span>Perform 3 separate wallet signatures</span>
            </li>
          </ul>
          <a href="#" rel="noopener noreferrer" className={s.link}>
            Learn more ↗
          </a>
        </div>
        <div className={s.listWrap}>
          <h5 className={cn('typography-h5', s.listTitle)}>Important notes:</h5>
          <ul className={s.list}>
            <li>
              <Svg
                id="warning"
                width={14}
                height={14}
                style={{ color: 'var(--color-turmeric)' }}
              />
              <span>
                Only use a wallet, never send BTC from an exchange account
              </span>
            </li>
            <li>
              <Svg
                id="warning"
                width={14}
                height={14}
                style={{ color: 'var(--color-turmeric)' }}
              />
              <span>Only send the exact BTC amount when prompted</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
