import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { useTBTCContract } from 'hooks/wallet';
import { Dropdown } from '../../Dropdown';
import { Checklist } from '../../Checklist';
import { Amount } from '../../Amount';
import { Check } from '../../Check';
import { Progress } from '../../Progress';
import { AlphaAlertModal } from './AlphaAlertModal';
import { GenerateAddressModal } from './GenerateAddressModal';
import s from './s.module.css';
import { useMint } from '..';

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
  const mintContext = useMint();
  const history = useHistory();
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
        .catch(console.error)
        .finally(() => setDisplayGenerateAddress(false));
    }
  };

  return (
    <div className={s.page}>
      <div className={cn(s.heading)}>
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
            callback={handlerAmount}
          />
        </div>
        <form className={s.block} onSubmit={submitHandler}>
          <h3 className={cn('typography-h5', s.blockTitle)}>Review</h3>
          <Check />
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
      {displayGenerateAddress && (
        <GenerateAddressModal
          ok={deposit}
          cancel={() => setDisplayAlphaAlert(false)}
        />
      )}
    </div>
  );
}
