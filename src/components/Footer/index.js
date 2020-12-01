import s from './s.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.left}>
        <div className={s.version}>{`v.${process.env.REACT_APP_VERSION}`}</div>
        <span className={s.alphaLabel}>ALPHA</span>
      </div>
      <button type="button" className={s.helpButton}>?</button>
    </footer>
  );
}
