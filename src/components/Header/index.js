import { useContext } from 'react';
import { ConnectContext } from 'context/connect';
import { Connect } from 'components/Header/Connect';
import { getNetworkName } from 'utils/connect';
import s from './s.module.css';

export function Header() {
  const { values } = useContext(ConnectContext);
  const networkName = getNetworkName(values.chainId);

  return (
    <header className={s.header}>
      <h1 className={s.heading}>
        <a href="/">
          <svg width="150" height="28">
            <use xlinkHref="/sprite.svg#logo" />
          </svg>
          <span className="visually-hidden">tBTC</span>
        </a>
      </h1>
      <div className={s.right}>
        <span className={s.network}>
          <svg width="12" height="12">
            <use xlinkHref="/sprite.svg#icon-on" />
          </svg>
          {networkName ? networkName : 'Network Disconnected'}
        </span>
        <Connect />
      </div>
    </header>
  );
}
