import cn from 'classnames';

import { Svg } from 'components/Svg';

import s from './s.module.css';

const getLevelText = (level) => {
  switch (level) {
    case 'normal':
      return 'normal';
    default:
      return 'courtesy called';
  }
};

export const DepositCard = ({
  className,
  selected,
  name,
  level,
  amount,
  onSelect,
  id,
}) => {
  const handlerSelect = () => {
    onSelect(id);
  };

  return (
    <div
      role="button"
      className={cn(s.wrap, className, { [s.active]: selected })}
      onClick={handlerSelect}
    >
      <div>
        <div className={s.heading}>
          <span className={s.name}>{name}</span>
          <span className={cn('typography-h6', s.label)}>
            {getLevelText(level)}
          </span>
        </div>
        <div className={s.amount}>{amount}</div>
      </div>
      <Svg id="check" width={28} height={28} className={s.checkmark} />
    </div>
  );
};
