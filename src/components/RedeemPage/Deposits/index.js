import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { nanoid } from 'nanoid';

import { Checklist } from 'components/Checklist';
import { Dropdown } from 'components/Dropdown';
import { Svg } from 'components/Svg';
import { DepositCard } from 'components/DepositCard';

import s from './s.module.css';

const mockOptions = [
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

const mockFilters = [
  {
    value: 'all',
    children: 'FILTER',
    level: 'default',
    icon: {
      id: 'filter',
      width: 10,
      height: 10,
    },
  },
  {
    value: 'filter1',
    children: 'filter1',
    level: 'default',
  },
  {
    value: 'filter2',
    children: 'filter2',
    level: 'default',
  },
];

const mockCards = {
  all: [
    {
      id: 'card1',
      name: 'Deposit #123456',
      level: 'default',
      amount: '1.0 TBTC',
    },
    {
      id: 'card2',
      name: 'Deposit #123456',
      level: 'normal',
      amount: '1.0 TBTC',
    },
    {
      id: 'card3',
      name: 'Deposit #123456',
      level: 'normal',
      amount: '1.0 TBTC',
    },
  ],
  my: [
    {
      id: 'card4',
      name: 'Deposit #123456',
      level: 'default',
      amount: '1.0 TBTC',
    },
    {
      id: 'card5',
      name: 'Deposit #123456',
      level: 'normal',
      amount: '1.0 TBTC',
    },
    {
      id: 'card6',
      name: 'Deposit #123456',
      level: 'normal',
      amount: '1.0 TBTC',
    },
  ],
};

export default function Deposits() {
  /** @type {[string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>]} */
  const [address, setAddress] = useState();
  const [selected, setSelected] = useState(mockOptions[0]);
  const [filter, setFilter] = useState(mockFilters[0]);
  const [selectedCard, setSelectedCard] = useState('card1');

  const handlerDropdown = (value) => {
    setSelected(value);
  };

  const handlerFilter = (value) => {
    setFilter(value);
  };

  const handlerSelectCard = (id) => {
    setSelectedCard(id);
  };

  const searchId = nanoid();

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Start a Redemption</h2>
        <Dropdown
          options={mockOptions}
          selected={selected}
          callback={handlerDropdown}
        />
      </div>
      <label htmlFor={searchId} className={cn('typography-h5', s.searchLabel)}>
        Search or Paste Address
      </label>
      <div className={s.searchWrap}>
        <Svg id="search" className={s.searchIcon} />
        <input
          type="text"
          placeholder="Address"
          id={searchId}
          className={s.searchInput}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <Checklist />
      <div className={s.container}>
        <div className={s.depositsWrap}>
          <h2 className={cn('typography-h5', s.depositsTitle)}>
            <span>All Deposits</span>
            <Dropdown
              options={mockFilters}
              selected={filter}
              callback={handlerFilter}
              className={s.filtersDropdown}
            />
          </h2>
          <ul className={s.list}>
            {mockCards.all.map((card) => (
              <li key={card.id}>
                <DepositCard
                  selected={card.id === selectedCard}
                  onSelect={handlerSelectCard}
                  {...card}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={s.depositsWrap}>
          <h2 className={cn('typography-h5', s.depositsTitle)}>My Deposits</h2>
          <ul className={s.list}>
            {mockCards.my.map((card) => (
              <li key={card.id}>
                <DepositCard
                  selected={card.id === selectedCard}
                  onSelect={handlerSelectCard}
                  {...card}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={s.buttonsWrap}>
        <NavLink
          to={`/redeem/${address}`}
          disabled={!address}
          className="button primary"
        >
          REDEEM NOW
        </NavLink>
      </div>
    </div>
  );
}
