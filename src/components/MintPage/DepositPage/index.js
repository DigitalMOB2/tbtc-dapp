import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { useMint } from '..';
import { useGeneral } from 'context/general';
import { useTBTCContract } from 'hooks/wallet';

import { Dropdown } from 'components/Dropdown';
import { Checklist } from 'components/Checklist';
import { Amount } from 'components/Amount';
import { Bill } from 'components/Bill';
import { Progress } from 'components/Progress';

import { AlphaAlertModal } from './AlphaAlertModal';
import { GenerateAddressModal } from './GenerateAddressModal';
import s from './s.module.css';

const options = [
  {
    value: 'mint1',
    children: 'Mint 864',
    level: 'normal',
    icon: {
      id: 'circle',
      width: 10,
      height: 10,
    },
  },
  {
    value: 'mint2',
    children: 'Mint 8641',
    level: 'error',
    icon: {
      id: 'error',
      width: 10,
      height: 10,
    },
  },
  {
    value: 'mint3',
    children: 'Mint 86435',
    level: 'warning',
    icon: {
      id: 'sign',
      width: 10,
      height: 10,
    },
  },
];

export default function MintPage() {
  const mintContext = useMint();
  const history = useHistory();
  const { notifications } = useGeneral();
  const [selected, setSelected] = useState(options[0]);
  const [amounts, setAmounts] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState();
  const [displayAlphaAlert, setDisplayAlphaAlert] = useState(false);
  const [displayGenerateAddress, setDisplayGenerateAddress] = useState(false);

  const tbtc = useTBTCContract();

  useEffect(() => {
    if (tbtc) {
      tbtc.Deposit.availableSatoshiLotSizes().then((vals) => {
        setAmounts(vals);
      });
    }
  }, [tbtc]);

  const handlerDropdown = (value) => {
    setSelected(value);
  };

  const handlerAmount = (value) => {
    setSelectedAmount(value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setDisplayAlphaAlert(true);
  };

  const deposit = () => {
    setDisplayAlphaAlert(false);
    if (tbtc && selectedAmount) {
      setDisplayGenerateAddress(true);
      tbtc.Deposit.withSatoshiLotSize(selectedAmount)
        .then((depositResponse) => {
          console.log({ depositResponse });
          mintContext.setDeposit(depositResponse);
          history.push(`/mint/${depositResponse.address}`);
        })
        .catch((err) => {
          notifications.addNotification(err.message, { level: 'error' });
        })
        .finally(() => setDisplayGenerateAddress(false));
    }
  };

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Start a Mint by depositing BTC</h2>
        <Dropdown
          options={options}
          selected={selected}
          callback={handlerDropdown}
        />
      </div>
      <Checklist />
      <div className={s.content}>
        <div>
          <h3 className={cn('typography-h5', s.blockTitle)}>Amount</h3>
          <Amount
            values={amounts}
            currency="BTC"
            selected={selectedAmount}
            callback={handlerAmount}
          />
        </div>
        <form onSubmit={submitHandler}>
          <h3 className={cn('typography-h5', s.blockTitle)}>Review</h3>
          <Bill />
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
        <div>
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
      {displayGenerateAddress && (
        <GenerateAddressModal
          ok={deposit}
          cancel={() => setDisplayAlphaAlert(false)}
        />
      )}
    </div>
  );
}
