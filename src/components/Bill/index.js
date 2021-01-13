import cn from 'classnames';

import { Tooltip } from './Tooltip';
import s from './s.module.css';

export const Bill = ({ className }) => {
  return (
    <div className={cn(s.wrap, className)}>
      <div className={s.mainRow}>
        <div className={s.value} data-subvalue="~$4670.35">
          <strong>0.1</strong> ฿TC
        </div>
        <svg width="22" height="37" className={s.arrow}>
          <use xlinkHref="/sprite.svg#arrow-right-currency" />
        </svg>
        <div className={s.value}>
          <strong>0.09</strong> TBTC
        </div>
      </div>
      <hr className={s.hr} />
      <dl className={s.dl}>
        <div className={s.block}>
          <div className={s.title}>
            <span>Security Fees</span>
            <Tooltip>Security Fees</Tooltip>
          </div>
          <div className={s.dlRow}>
            <dt>1% TBTC Signer Fee</dt>
            <dd>0.01 TBTC</dd>
          </div>
        </div>
        <hr className={s.hr} />
        <div className={s.block}>
          <div className={s.title}>
            <span>Transfer Fees</span>
            <Tooltip>Transfer Fees</Tooltip>
          </div>
          <div className={s.dlRow}>
            <dt>Deposit Gas Fee</dt>
            <dd>~0.1 ETH</dd>
          </div>
          <hr className={s.hr} />
          <div className={s.dlRow}>
            <dt>Proof Gas Fee</dt>
            <dd>~0.1 ETH</dd>
          </div>
        </div>
        <hr className={s.hr} />
        <div className={s.title}>Total Fees</div>
        <div className={s.dlRow}>~$400.00*</div>
      </dl>
    </div>
  );
};
