import s from './s.module.css';
import { version } from '../../../package.json';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.left}>
        <div className={s.version}>{`v.${version}`}</div>
        <span className={s.alphaLabel}>ALPHA</span>
      </div>
      <button type="button" className={s.helpButton}>
        ?
      </button>
    </footer>
  );
}
