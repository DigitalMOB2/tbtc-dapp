import { useState } from 'react';
import cn from 'classnames';

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
        <svg width="18" height="18">
          <use xlinkHref="/sprite.svg#close-circle" />
        </svg>
      </button>
      <h2 className={cn('typography-h2', s.title)}>Checklist</h2>
      <div className={s.content}>
        <div className={s.listWrap}>
          <h5 className={cn('typography-h5', s.listTitle)}>
            What you should have on hand:
          </h5>
          <ul className={s.list}>
            <li>
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-mint)' }}
              >
                <use xlinkHref="/sprite.svg#browser" />
              </svg>
              <span>Web3-compatible browser</span>
            </li>
            <li>
              <svg
                width="14"
                height="15"
                style={{ color: 'var(--color-pumpkin)' }}
              >
                <use xlinkHref="/sprite.svg#bitcoin" />
              </svg>
              <span>Bitcoin wallet</span>
            </li>
            <li>
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-light-slate-blue)' }}
              >
                <use xlinkHref="/sprite.svg#eth" />
              </svg>
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
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-mint)' }}
              >
                <use xlinkHref="/sprite.svg#time" />
              </svg>
              <span>
                You should be near this computer 2 hours to complete minting
                steps
              </span>
            </li>
            <li>
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-mint)' }}
              >
                <use xlinkHref="/sprite.svg#sign" />
              </svg>
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
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-turmeric)' }}
              >
                <use xlinkHref="/sprite.svg#warning" />
              </svg>
              <span>
                Only use a wallet, never send BTC from an exchange account
              </span>
            </li>
            <li>
              <svg
                width="14"
                height="14"
                style={{ color: 'var(--color-turmeric)' }}
              >
                <use xlinkHref="/sprite.svg#warning" />
              </svg>
              <span>Only send the exact BTC amount when prompted</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
