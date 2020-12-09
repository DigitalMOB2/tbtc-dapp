import { useRef, useState, useEffect, useContext } from 'react';
import { usePopper } from 'react-popper';
import outy from 'outy';
import { WalletContext } from 'context/wallet';
import { formatEther } from '@ethersproject/units';
import { copyToClipboard } from 'utils/copyToClipboard';
import { useBallance } from 'hooks/wallet';
import s from './s.module.css';

/** @param {string|null|undefined} account */
function trimAddress(account) {
  if (!account) return '';

  return `${account.substring(0, 6)}...${account.substring(
    account.length - 4
  )}`;
}

export function Connect() {
  const walletContext = useContext(WalletContext);
  const [open, setOpen] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  /** @type{{current: {remove: Function}|null}} */
  const outyRef = useRef(null);
  const ethBalance = useBallance();

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

  const isConnected = !!(walletContext.active || walletContext.error);

  return (
    <>
      <button
        type="button"
        className={s.walletButton}
        ref={referenceElement}
        onClick={() => setOpen((isOpen) => !isOpen)}
        {...attributes.popper}
      >
        {isConnected ? trimAddress(walletContext.account) : 'Connect'}
      </button>
      <div
        ref={popperElement}
        style={{ ...styles.popper, visibility: open ? 'visible' : 'hidden' }}
        className={s.popup}
      >
        <div>{walletContext.status === 'activating' ? 'loading...' : null}</div>
        {isConnected ? (
          <>
            <button
              type="button"
              onClick={() => copyToClipboard(walletContext.account)}
            >
              COPY
            </button>
            <div>
              {ethBalance === undefined
                ? '...'
                : ethBalance === null
                ? 'Error'
                : `Ξ ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
            </div>
          </>
        ) : (
          <>
            <button
              type="button"
              className={s.item}
              onClick={() => walletContext.injected()}
            >
              Metamask
            </button>
            <button
              type="button"
              className={s.item}
              onClick={() => walletContext.ledger()}
            >
              Ledger
            </button>
          </>
        )}
        {walletContext.active || walletContext.error ? (
          <button
            onClick={() => {
              walletContext.disconnect();
            }}
          >
            Disconnect
          </button>
        ) : null}
      </div>
    </>
  );
}
