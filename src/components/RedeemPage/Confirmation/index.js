import { useParams, useHistory } from 'react-router-dom';
import cn from 'classnames';

import { DepositCard } from 'components/DepositCard';
import { Steps } from 'components/Steps';
import { Progress } from 'components/Progress';

import s from './s.module.css';

export default function Confirmation() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  const history = useHistory();

  const claimHandler = () => {
    history.push(`/redeem/${address}/done`);
  };

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Redeeming...</h2>
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
          <Steps currentStepIdx={3} />

          <div className={s.buttonsWrap}>
            <button
              type="button"
              onClick={claimHandler}
              className={cn(s.button, 'button', 'secondary')}
            >
              CLAIM BTC
            </button>
            <a href="/" className={cn(s.button, 'button', 'secondary')}>
              check etherscan ↗︎
            </a>
            <button
              type="button"
              className={cn(s.button, 'button', 'secondary')}
            >
              CANCEL
            </button>
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
    </div>
  );
}
