import { useRef, useState, useEffect, useContext } from 'react';
import { usePopper } from 'react-popper';
import outy from 'outy';
import { ConnectContext, getErrorMessage } from 'context/connect';
import { formatEther } from '@ethersproject/units';
import s from './s.module.css';

function trimAddress(account) {
  if (!account) return '';
  return account === null
    ? '-'
    : account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : '';
}

export function Connect() {
  const { values, actions } = useContext(ConnectContext);
  const [open, setOpen] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  /** @type{{current: {remove: Function}|null}} */
  const outyRef = useRef(null);

  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement.current,
    popperElement.current,
    {
      placement: 'bottom',
      strategy: 'absolute',
      modifiers: [{ name: 'offset', options: { offset: [0, 12] } }],
    }
  );

  useEffect(() => {
    if (forceUpdate) {
      forceUpdate();
    }

    if (open) {
      outyRef.current = outy(
        [referenceElement.current, popperElement.current],
        ['click', 'touchstart'],
        () => setOpen(false)
      );
    }

    return () => {
      if (outyRef.current && outyRef.current.remove) {
        outyRef.current.remove();
      }
    };
  }, [open, forceUpdate]);

  const isConnected = !!(values.active || values.error);

  return (
    <>
      {!!values.error && (
        <i style={{ color: 'orangered' }}>{getErrorMessage(values.error)}</i>
      )}
      <button
        type="button"
        className={s.walletButton}
        ref={referenceElement}
        onClick={() => setOpen((isOpen) => !isOpen)}
        {...attributes.popper}
      >
        {isConnected ? trimAddress(values.account) : 'Connect'}
      </button>
      <div
        ref={popperElement}
        style={{ ...styles.popper, visibility: open ? 'visible' : 'hidden' }}
        className={s.popup}
      >
        {isConnected ? (
          <>
            <div>
              {values.ethBalance === undefined
                ? '...'
                : values.ethBalance === null
                ? 'Error'
                : `Ξ${parseFloat(formatEther(values.ethBalance)).toPrecision(
                    4
                  )}`}
            </div>
          </>
        ) : (
          <>
            <button type="button" className={s.item} onClick={actions.injected}>
              Metamask
            </button>
            <button type="button" className={s.item}>
              Ledger
            </button>
          </>
        )}
        {values.active || values.error ? (
          <button
            onClick={() => {
              actions.deactivate();
            }}
          >
            Disconnect
          </button>
        ) : null}
      </div>
    </>
  );
}
