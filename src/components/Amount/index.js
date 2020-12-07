import { nanoid } from 'nanoid';
import cn from 'classnames';

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
      {values.map((value) => {
        const id = nanoid();
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
              {value} {currency}
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
            {value === selected ? (
              <svg width="16" height="16" className={s.checkMark}>
                <use xlinkHref="/sprite.svg#check" />
              </svg>
            ) : null}
          </label>
        );
      })}
    </div>
  );
};
