import { useState, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import outy from 'outy';

import s from './s.module.css';

const getItemNode = ({ level, children }) => {
  switch (level) {
    case 'error':
      return (
        <div className={s.itemString}>
          <svg width="10" height="10" className={cn(s.icon, s.red)}>
            <use xlinkHref="/sprite.svg#error" />
          </svg>
          <span>{children}</span>
          <span className={cn(s.secondaryText, s.red)}>ERRORS!</span>
        </div>
      );
    case 'warning':
      return (
        <span className={s.itemString}>
          <svg width="10" height="10" className={cn(s.icon, s.yellow)}>
            <use xlinkHref="/sprite.svg#sign" />
          </svg>
          <span>{children}</span>
          <span className={cn(s.secondaryText, s.yellow)}>PLEASE SIGN</span>
        </span>
      );
    case 'normal':
      return (
        <span className={s.itemString}>
          <svg width="10" height="10" className={cn(s.icon, s.green)}>
            <use xlinkHref="/sprite.svg#circle" />
          </svg>
          <span>{children}</span>
        </span>
      );
    default:
      return <>{children}</>;
  }
};

export const Dropdown = ({ options, selected, callback }) => {
  const [show, setShow] = useState(false);
  const dropdownRef = useRef(null);

  const handlerChange = useCallback(
    (item) => {
      setShow(false);
      callback(item);
    },
    [callback]
  );

  const closeHandler = useCallback(() => {
    setShow(false);
  }, []);

  const toggleHandler = useCallback(() => {
    setShow((prevState) => !prevState);
  }, []);

  const keyboardHandler = useCallback(
    (event) => {
      if (closeHandler && event.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler]
  );

  useEffect(() => {
    let outsideTap;
    if (show) {
      document.addEventListener('keydown', keyboardHandler, false);
    }
    if (dropdownRef.current) {
      outsideTap = outy(
        dropdownRef.current,
        ['click', 'touchend'],
        closeHandler
      );
    }

    return () => {
      document.removeEventListener('keydown', keyboardHandler, false);
      if (outsideTap) {
        outsideTap.remove();
      }
    };
  }, [show, closeHandler, keyboardHandler]);

  const handlerChangeKeyPress = (event, item) => {
    if (event.key === 'Enter') {
      handlerChange(item);
    }
  };

  const handlerToggleKeyPress = (event) => {
    if (event.key === 'Enter') {
      toggleHandler();
    }
  };

  return (
    <div ref={dropdownRef} className={s.wrap} role="radiogroup">
      <select value={selected.value} readOnly className={s.select}>
        {options.map(({ children, value }) => (
          <option key={value} value={value}>
            {children}
          </option>
        ))}
      </select>
      <div
        className={cn('typography-h6', s.selected, { [s.active]: show })}
        onClick={toggleHandler}
        tabIndex={0}
        role="radio"
        aria-checked="true"
        onKeyPress={handlerToggleKeyPress}
      >
        {getItemNode(selected)}
        <svg width="14" height="14" className={s.dropdownArrow}>
          <use xlinkHref="/sprite.svg#dropdown-arrow" />
        </svg>
      </div>
      <div className={cn(s.items, { [s.hidden]: !show })}>
        {options.map((item) => {
          if (item.value === selected.value) {
            return null;
          }
          return (
            <div
              key={item.value}
              className={cn('typography-h6', s.item)}
              onClick={() => handlerChange(item)}
              tabIndex={0}
              role="radio"
              aria-checked="false"
              onKeyPress={(event) => handlerChangeKeyPress(event, item)}
            >
              {getItemNode(item)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
