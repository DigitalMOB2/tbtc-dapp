import cn from 'classnames';
import { formatSatsToBtc } from 'utils/wallet';

import s from './s.module.css';

export const Amount = ({ values, currency, selected, callback }) => {
  const handlerChoose = (value) => {
    callback(value);
  };

  const handlerKeyPress = (event, value) => {
    if (event.key === 'Enter') {
      handlerChoose(value);
    }
  };

  return (
    <div className={s.wrap}>
      {values.map((value, idx) => {
        const id = `amount${idx}`;
        return (
          <label
            htmlFor={id}
            key={id}
            className={cn(s.label, { [s.active]: value === selected })}
            tabIndex={0}
            onClick={() => handlerChoose(value)}
            onKeyPress={(event) => handlerKeyPress(event, value)}
          >
            <span className="typography-h4">
              {formatSatsToBtc(value)} {currency}
            </span>
            <input
              type="radio"
              id={id}
              name={currency}
              value={value}
              checked={value === selected}
              tabIndex={-1}
              onChange={(e) => callback(Number(e.target.value))}
            />
            <svg width="16" height="16" className={s.checkMark}>
              <use xlinkHref="/sprite.svg#check" />
            </svg>
          </label>
        );
      })}
    </div>
  );
};
