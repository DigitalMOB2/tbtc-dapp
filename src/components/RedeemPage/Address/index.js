import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import cn from 'classnames';

import { DepositCard } from 'components/DepositCard';
import { Svg } from 'components/Svg';
import { Progress } from 'components/Progress';

import { ConfirmModal } from './ConfirmModal';
import s from './s.module.css';

export default function Address() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  const history = useHistory();
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const sendHandler = () => {
    history.push(`/redeem/${address}/confirmation`);
  };

  const inputId = nanoid();

  const handlerConfirm = () => {
    setConfirmed(true);
    setDisplayConfirm(false);
  };

  const handlerReject = () => {
    setConfirmed(false);
    setDisplayConfirm(false);
  };

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Where should your BTC go?</h2>
      </div>

      <div className={s.container}>
        <div className={s.inner}>
          <DepositCard
            id="card1"
            name="Deposit #123456"
            level="default"
            amount="1.0 TBTC"
            className={s.depositCard}
            onSelect={() => null}
            selected
          />

          <label htmlFor={inputId} className={cn('typography-h5', s.subTitle)}>
            Redeem to Address
          </label>
          <div className={s.inputWrap}>
            <Svg
              id="bitcoin-wallet"
              width={15}
              height={15}
              className={s.inputIcon}
            />
            <input
              type="text"
              id={inputId}
              className={s.input}
              value={address}
              readOnly
            />
          </div>
          <div className={s.buttonsWarp}>
            <button
              type="button"
              className={cn(s.button, 'button', 'secondary')}
            >
              CANCEL
            </button>
            {confirmed ? (
              <button
                type="button"
                onClick={sendHandler}
                className={cn(s.button, 'button', 'primary')}
              >
                SEND
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setDisplayConfirm(true)}
                className={cn(s.button, 'button', 'primary')}
              >
                CONFIRM
              </button>
            )}
          </div>
        </div>
        <div>
          <h2 className={cn('typography-h5', s.subTitle)}>
            Redemption Progress
          </h2>
          <Progress
            options={[
              { name: 'Start', description: 'Despoit ID: 1234•••9087' },
              {
                name: 'Deposit Size',
                description: '0.1 BTC > 0.09 TBTC\n0.255 ETH',
              },
              {
                name: 'Send BTC',
                description: '0x123456789012345678900098989786756447',
              },
              { name: 'BTC Block Confirmation' },
              { name: 'Prove Deposit' },
              { name: 'Complete' },
            ]}
            activeIndex={3}
          />
        </div>
      </div>
      {displayConfirm && (
        <ConfirmModal
          ok={handlerConfirm}
          cancel={handlerReject}
          address={address}
        />
      )}
    </div>
  );
}
