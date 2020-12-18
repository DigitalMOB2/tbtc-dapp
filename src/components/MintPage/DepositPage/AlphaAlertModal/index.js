import cn from 'classnames';
import { Svg } from 'components/Svg';
import s from './s.module.css';

export function AlphaAlertModal({ ok, cancel }) {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.description}>
          <Svg id="warning" width={16} height={16} />
          <p>
            The safety of your funds is important to us. This dApp is in ALPHA
            and improper use <strong>may lead to loss of funds</strong>. For
            more information and options, please visit our{' '}
            <a href="/">Discord community</a>. Do you agree to continue?
          </p>
        </div>
        <div className={s.buttonsWrap}>
          <button
            type="button"
            className={cn('button', 'primary', s.cancelButton)}
            onClick={cancel}
          >
            CANCEL
          </button>
          <button
            type="button"
            className={cn('button', 'secondary', s.confirmButton)}
            onClick={ok}
          >
            I AGREE
          </button>
        </div>
      </div>
    </div>
  );
}
