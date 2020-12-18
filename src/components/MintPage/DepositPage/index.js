import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';
import { EthereumHelpers } from '@keep-network/tbtc.js';

import { Dropdown } from '../../Dropdown';
import { Checklist } from '../../Checklist';
import { Amount } from '../../Amount';
import { Check } from '../../Check';
import { Progress } from '../../Progress';
import { AlphaAlertModal } from './AlphaAlertModal';
import s from './s.module.css';
import { useMint } from '..';
import { useGeneral } from 'context/general';
import { useSystemContract } from 'web3/contracts/system';
import { useDepositFactoryContract } from 'web3/contracts/depositFactory';
import { useWallet } from 'context/wallet';

const options = [
  {
    value: 'mint1',
    children: 'Mint 864',
    level: 'normal',
  },
  {
    value: 'mint2',
    children: 'Mint 8641',
    level: 'error',
  },
  {
    value: 'mint3',
    children: 'Mint 86435',
    level: 'warning',
  },
];

export default function MintPage() {
  const {
    read: systemContractRead,
    contract: systemContract,
  } = useSystemContract();
  const depositFactoryContract = useDepositFactoryContract();

  const { web3 } = useWallet();
  const mintContext = useMint();
  const history = useHistory();
  const { notifications } = useGeneral();
  const [selected, setSelected] = useState(options[0]);
  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
  const [amounts, setAmounts] = useState([]);
  /** @type {[string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>]} */
  const [selectedAmount, setSelectedAmount] = useState();
  const [displayAlphaAlert, setDisplayAlphaAlert] = useState(false);

  useEffect(() => {
    systemContractRead(['getAllowedLotSizes']).then(
      ([allowedLotSizes, newDepositFeeEstimate]) => {
        setAmounts(allowedLotSizes);
        console.log({ allowedLotSizes, newDepositFeeEstimate });
      }
    );
  }, [systemContractRead]);

  const handlerDropdown = (value) => {
    setSelected(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayAlphaAlert(true);
  };

  const deposit = async () => {
    if (!selectedAmount) {
      return;
    }

    const [newDepositFeeEstimate] = await systemContractRead([
      'getNewDepositFeeEstimate',
    ]);
    console.log({ newDepositFeeEstimate });

    try {
      const depositResponse = await depositFactoryContract.createDeposit(
        selectedAmount,
        newDepositFeeEstimate
      );
      console.log({ depositResponse });

      const createdEvent = EthereumHelpers.readEventFromTransaction(
        web3,
        depositResponse,
        systemContract,
        'Created'
      );

      mintContext.setEvents((prevEvents) => ({
        ...prevEvents,
        [createdEvent._depositContractAddress]: createdEvent,
      }));
      history.push(`/mint/${createdEvent._depositContractAddress}`);
    } catch (err) {
      notifications.addNotification(err.message, { level: 'error' });
    }
  };

  return (
    <div className={s.page}>
      <div className={s.heading}>
        <h2 className="typography-h2">Start a Mint by depositing BTC</h2>
        <Dropdown
          options={options}
          selected={selected}
          callback={handlerDropdown}
        />
      </div>
      <Checklist />
      <div className={s.content}>
        <div className={s.block}>
          <h3 className={cn('typography-h5', s.blockTitle)}>Amount</h3>
          <Amount
            values={amounts}
            currency="BTC"
            selected={selectedAmount}
            callback={setSelectedAmount}
          />
        </div>
        <form className={s.block} onSubmit={submitHandler}>
          <h3 className={cn('typography-h5', s.blockTitle)}>Review</h3>
          <Check amount={selectedAmount} />
          <div className={s.buttonsWrap}>
            <button
              type="button"
              className={cn('button', 'secondary', s.button)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={cn('button', 'primary', s.button)}
              disabled={!selectedAmount}
            >
              Confirm
            </button>
          </div>
        </form>
        <div className={s.block}>
          <h3 className={cn('typography-h5', s.blockTitle)}>Progress</h3>
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
      {displayAlphaAlert && (
        <AlphaAlertModal
          ok={deposit}
          cancel={() => setDisplayAlphaAlert(false)}
        />
      )}
    </div>
  );
}
