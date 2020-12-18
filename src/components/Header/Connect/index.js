import { useRef, useState, useEffect, useContext } from 'react';
import { usePopper } from 'react-popper';
import outy from 'outy';
import cn from 'classnames';
import { WalletContext } from 'context/wallet';
import { formatEther } from '@ethersproject/units';
import { copyToClipboard } from 'utils/copyToClipboard';
import { useBalance } from 'hooks/wallet';
import { Svg } from '../../Svg';
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
  const [copied, setCopied] = useState(null);
  const [showBalance, setShowBalance] = useState(false);
  const referenceElement = useRef(null);
  const popperElement = useRef(null);
  /** @type{{current: {remove: Function}|null}} */
  const outyRef = useRef(null);
  const ethBalance = useBalance();

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
      setCopied(null);
    }

    return () => {
      if (outyRef.current && outyRef.current.remove) {
        outyRef.current.remove();
      }
    };
  }, [open, forceUpdate]);

  const isConnected = !!(walletContext.active || walletContext.error);

  const handlerShowBalances = () => {
    setShowBalance((prevState) => !prevState);
  };

  const protectValue = (value) => (showBalance ? value : '•••••••');

  return (
    <>
      <button
        type="button"
        className={cn(s.walletButton, {
          [s.open]: open,
          [s.connected]: isConnected,
        })}
        ref={referenceElement}
        onClick={() => setOpen((isOpen) => !isOpen)}
        {...attributes.popper}
      >
        <svg width="11" height="11">
          <use xlinkHref="/sprite.svg#wallet" />
        </svg>
        {isConnected ? trimAddress(walletContext.account) : 'Connect'}
      </button>
      <div
        ref={popperElement}
        style={{ ...styles.popper, visibility: open ? 'visible' : 'hidden' }}
        className={s.popup}
      >
        {/*<div>{walletContext.status === 'activating' ? <Spinner /> : null}</div>*/}
        {isConnected ? (
          <>
            <button
              type="button"
              onClick={() => copyToClipboard(walletContext.account, setCopied)}
              className={cn('typography-tiny-mono-text', s.copyButton)}
            >
              {copied === null
                ? 'COPY'
                : copied === true
                ? 'COPIED!'
                : 'NOT COPIED!'}
            </button>
            <hr className={s.hr} />
            <button
              type="button"
              className={s.balanceButton}
              onClick={handlerShowBalances}
            >
              <span className="visually-hidden">
                {showBalance ? 'Hide balances' : 'Show balances'}
              </span>
              {showBalance ? (
                <Svg id="eye-closed" width={14} height={14} />
              ) : (
                <Svg id="eye" width={12} height={8} />
              )}
            </button>
            <div className={s.currency}>
              <span>
                {ethBalance === undefined
                  ? '...'
                  : ethBalance === null
                  ? 'Error'
                  : protectValue(
                      parseFloat(formatEther(ethBalance)).toPrecision(4)
                    )}
              </span>
              <span>{protectValue('ETH')}</span>
            </div>
            {/*<div className={s.price}>{protectValue('$4670.35')}</div>*/}
          </>
        ) : (
          <>
            <button
              type="button"
              className={s.item}
              onClick={() => walletContext.injected()}
            >
              <svg width="20" height="19">
                <use xlinkHref="/sprite.svg#metamask" />
              </svg>
              Metamask
            </button>
            <button
              type="button"
              className={s.item}
              onClick={() => walletContext.ledger()}
            >
              <svg width="20" height="20">
                <use xlinkHref="/sprite.svg#ledger" />
              </svg>
              Ledger
            </button>
          </>
        )}
        {walletContext.active || walletContext.error ? (
          <button
            type="button"
            className={cn(s.item, s.disconnectButton)}
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
