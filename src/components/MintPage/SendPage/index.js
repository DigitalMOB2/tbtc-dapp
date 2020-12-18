import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import QR from 'qrcode.react';
import cn from 'classnames';

import { useTBTCContract } from 'hooks/wallet';
import { formatSatsToBtc, getEtherscanUrl } from 'utils/wallet';
import { copyToClipboard } from 'utils/copyToClipboard';
import { Svg } from 'components/Svg';
import { useMint } from '..';
import { useWallet } from 'context/wallet';
import { Progress } from 'components/Progress';

import s from './s.module.css';
import btcImg from './btc.png';

export default function SendPage() {
  const wallet = useWallet();
  let { address } = useParams();
  const mintContext = useMint();
  // const { state } = useLocation();
  const tbtc = useTBTCContract();
  const [deposit, setDeposit] = useState(mintContext.deposit);
  const [lotSize, setLotSize] = useState(0);
  const [showWarn, setShowWarn] = useState(true);
  const [copy, setCopy] = useState(null);

  useEffect(() => {
    if (tbtc && !mintContext.deposit) {
      tbtc.Deposit.withAddress(address)
        .then((resp) => {
          console.log({ resp });
          setDeposit(resp);
        })
        .catch((e) => {
          console.error({ e });
          setDeposit(null);
        });
    }
  }, [address, tbtc, mintContext.deposit]);

  useEffect(() => {
    if (deposit) {
      deposit.getLotSizeSatoshis().then(setLotSize);
    }
  }, [deposit]);

  window.deposit = deposit;

  if (deposit === null) {
    return <Redirect to="/" />;
  }

  if (deposit === undefined) {
    return <>'loading...'</>;
  }

  const amountInBtc = formatSatsToBtc(lotSize);

  return (
    <div className={s.page}>
      <h2 className={cn('typography-h2', s.title)}>Send BTC</h2>
      <div className={s.container}>
        <div className={s.content}>
          {showWarn ? (
            <div className={s.warn}>
              <Svg id="warning" width={14} height={14} className={s.warnIcon} />
              <p>
                Never send BTC from an exchange.
                <br />
                Make sure to send the exact amount of BTC displayed.
              </p>
              <button
                type="button"
                className={s.closeWarnButton}
                onClick={() => setShowWarn(false)}
              >
                <span className="visually-hidden">Close warning</span>
                <Svg id="close-circle" width={14} height={14} />
              </button>
            </div>
          ) : null}
          <h3 className={cn('typography-h5', s.subtitle)}>Amount</h3>
          <div className={s.amountWrap}>
            <div className="typography-h1" style={{ fontWeight: 300 }}>
              <strong>{amountInBtc}</strong> ฿TC
            </div>
            <QR
              value={`bitcoin:${address}?amount=${amountInBtc}&label=Single-Use+tBTC+Deposit+Wallet`}
              renderAs="svg"
              imageSettings={{
                src: btcImg,
                width: 24,
                height: 24,
                x: null,
                y: null,
                excavate: true,
              }}
              size={128}
            />
          </div>
          <div>
            <h3 className={cn('typography-h5', s.subtitle)}>Send to Address</h3>
            <div className={s.inputWrap}>
              <input
                type="text"
                value={address}
                readOnly
                className={s.copyInput}
              />
              <button
                type="button"
                onClick={() => copyToClipboard(address, setCopy)}
                className={cn('button', 'primary', s.copyButton)}
              >
                {copy === null
                  ? 'Copy'
                  : copy === true
                  ? 'Copied!'
                  : 'Not copied1'}
              </button>
            </div>
            <p className={s.hint}>
              <Svg id="time" width="15" height="15" /> Time remaining to fund
              address: <strong>2 hours, 25 minutes</strong>.
            </p>
            <div className={s.buttonsWrap}>
              <a
                href={getEtherscanUrl(wallet.chainId, wallet.account)}
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
              >
                CHECK ETHERSCAN ↗︎
              </a>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
              >
                check bitcoin chain ↗︎
              </a>
            </div>
          </div>
        </div>
        <div>
          <h3 className={cn('typography-h5', s.subtitle)}>Mint Progress</h3>
          <Progress
            options={[
              { name: 'Start', description: 'Despoit ID: 1234•••9087' },
              {
                name: 'Deposit Size',
                description: '0.1 BTC > 0.09 TBTC\n0.255 ETH',
              },
              {
                name: 'Send BTC',
                description: '0x123456789012345678900098989786756447',
              },
              { name: 'BTC Block Confirmation' },
              { name: 'Prove Deposit' },
              { name: 'Complete' },
            ]}
            activeIndex={3}
          />
        </div>
      </div>
    </div>
  );
}
