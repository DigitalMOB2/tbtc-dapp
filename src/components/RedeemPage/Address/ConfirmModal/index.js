import cn from 'classnames';

import { Svg } from 'components/Svg';

import s from './s.module.css';

export function ConfirmModal({ ok, cancel, address }) {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.description}>
          <Svg id="warning" width={16} height={16} />
          <p>
            Please confirm the Bitcoin address before sending.
            <br />
            <br />
            <strong>{address}</strong>
          </p>
        </div>
        <div className={s.buttonsWrap}>
          <button
            type="button"
            className={cn('button', 'primary', s.cancelButton)}
            onClick={cancel}
          >
            it’s wrong
          </button>
          <button
            type="button"
            className={cn('button', 'secondary', s.confirmButton)}
            onClick={ok}
          >
            it’s correct
          </button>
        </div>
      </div>
    </div>
  );
}
