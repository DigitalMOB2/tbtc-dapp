import s from './s.module.css'

export function Header() {
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
        <span className={s.network}>Network Disconnected</span>
        <button className={s.walletButton}>Connect</button>
      </div>
    </header>
  );
}
