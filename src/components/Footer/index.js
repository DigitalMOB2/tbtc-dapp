import s from './s.module.css';
import { Svg } from 'components/Svg';
import { version } from '../../../package.json';

export function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.left}>
        <div className={s.version}>{`v.${version}`}</div>
        <span className={s.alphaLabel}>ALPHA</span>
      </div>
      <a href="/" className={s.helpButton}>
        <Svg id="question" width="24" height="24" />
      </a>
    </footer>
  );
}
