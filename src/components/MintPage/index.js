import { useState } from 'react';
import cn from 'classnames';

import { Dropdown } from '../Dropdown';
import { Checklist } from './Checklist';
import { Amount } from '../Amount';
import s from './s.module.css';

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

const amountValues = [0.01, 0.2, 0.3];

export default function MintPage() {
  const [selected, setSelected] = useState(options[0]);
  const [selectedAmount, setSelectedAmount] = useState(amountValues[0]);

  const handlerDropdown = (value) => {
    setSelected(value);
  };

  const handlerAmount = (value) => {
    setSelectedAmount(value);
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
        <Amount
          values={amountValues}
          currency="BTC"
          selected={selectedAmount}
          callback={handlerAmount}
        />
      </div>
    </div>
  );
}
