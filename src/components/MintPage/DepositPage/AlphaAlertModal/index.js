import s from './s.module.css';

export function AlphaAlertModal({ ok, cancel }) {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <p>
          The safety of your funds is important to us. This dApp is in ALPHA and
          improper use <strong>may lead to loss of funds</strong>. For more
          information and options, please visit our{' '}
          <a href="/">Discord community</a>. Do you agree to continue?
        </p>
        <div>
          <button type="button" onClick={cancel}>
            CANCEL
          </button>
          <button type="button" onClick={ok}>
            I AGREE
          </button>
        </div>
      </div>
    </div>
  );
}
