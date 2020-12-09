import { useState, useEffect, useCallback } from 'react';
import { usePopper } from 'react-popper';
import ReactDOM from 'react-dom';
import outy from 'outy';

import s from './s.module.css';

const root = document.getElementById('root-popper');

export const Tooltip = ({ children }) => {
  const [show, setShow] = useState(false);
  const [buttonRef, setButtonRef] = useState(null);
  const [popperRef, setPopperRef] = useState(null);

  const { styles, attributes } = usePopper(buttonRef, popperRef, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: { offset: [-16, 8] },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
    ],
  });

  const closeHandler = useCallback(() => {
    setShow(false);
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
    if (popperRef) {
      outsideTap = outy(
        [popperRef, buttonRef],
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
  }, [show, popperRef, closeHandler, keyboardHandler]);

  return (
    <>
      <button
        type="button"
        className={s.button}
        ref={setButtonRef}
        onClick={() => setShow((prevState) => !prevState)}
      >
        <svg width="8" height="9">
          <use xlinkHref="/sprite.svg#question" />
        </svg>
      </button>
      {show &&
        ReactDOM.createPortal(
          <div
            ref={setPopperRef}
            style={styles.popper}
            className={s.popper}
            {...attributes.popper}
          >
            {children}
            <div className={s.arrow} />
          </div>,
          root
        )}
    </>
  );
};
