import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import { Svg } from 'components/Svg';
import s from './s.module.css';

export default function WithdrawPage() {
  const [checkboxValue, setCheckboxValue] = useState(null);
  const [amount, setAmount] = useState(null);
  const [wallet, setWallet] = useState(
    '0x931D387731bBbC988B312206c74F77D004D6B84b67f32'
  );

  const amountInputId = nanoid();
  const checkboxId = nanoid();
  const walletInputId = nanoid();

  const handlerCheckbox = (e) => {
    setCheckboxValue(e.target.checked);
  };

  const handlerAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Withdrawing From Account #12345</h2>
      </div>
      <div className={s.container}>
        <h3 className={cn('typography-h5', s.subtitle)}>
          Earnings Available to Withdraw
        </h3>
        <div className={s.currency}>0.324534 TBTC</div>
        <div className={s.apy}>1000.00 TBTC Principle at 20% APY</div>
        <label
          className={cn('typography-h5', s.subtitle)}
          htmlFor={amountInputId}
        >
          Withdraw Amount
        </label>
        <div className={s.inputWrap}>
          <input
            type="text"
            className={s.amountInput}
            id={amountInputId}
            value={amount}
            onChange={handlerAmount}
          />
          <label htmlFor={amountInputId} className={s.tbtc}>
            <span>T฿TC</span>
          </label>
        </div>
        <label htmlFor={checkboxId} className={s.checkboxWrap}>
          <input
            type="checkbox"
            id={checkboxId}
            className="visually-hidden"
            checked={checkboxValue}
            onChange={handlerCheckbox}
          />
          <Svg
            id={checkboxValue ? 'radio-checkbox-checked' : 'radio-checkbox'}
            width={22}
            height={22}
            className={s.checkboxIcon}
          />
          <span>Re-invest to this account.</span>
        </label>
        <h3 className={cn('typography-h5', s.subtitle)}>Withdraw Address</h3>
        <div className={s.inputWrap}>
          <label className={s.walletIcon} htmlFor={walletInputId}>
            <Svg id="wallet" width={16} height={16} />
          </label>
          <input
            type="text"
            value={wallet}
            readOnly
            className={s.walletInput}
            id={walletInputId}
          />
        </div>
        <div className={s.buttonsWrap}>
          <NavLink to="/" className={cn('button', 'secondary-red', s.button)}>
            Cancel
          </NavLink>
          <NavLink to="/" className={cn('button', 'secondary', s.button)}>
            Confirm ->
          </NavLink>
        </div>
      </div>
    </div>
  );
}
