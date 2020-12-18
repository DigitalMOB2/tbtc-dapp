import { useCallback, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
// import BigNumber from 'bignumber.js';
import QR from 'qrcode.react';
import cn from 'classnames';
// import { useTBTCContract } from 'hooks/wallet';
import { formatSatsToBtc, getEtherscanUrl } from 'utils/wallet';
import { copyToClipboard } from 'utils/copyToClipboard';
import { Svg } from 'components/Svg';
import { useMint } from '..';
import { useWallet } from 'context/wallet';
import { useSystemContract } from 'web3/contracts/system';
import { EthereumHelpers } from '@keep-network/tbtc.js';
import { useDepositContract } from 'web3/contracts/deposit';
import { Progress } from 'components/Progress';

import btcImg from './btc.png';
import s from './s.module.css';

/** @typedef {import('..').TEvent} TEvent */

export default function SendPage() {
  const wallet = useWallet();
  const systemContract = useSystemContract();
  /** @type {{ address: string }} */
  let { address: depositAddress } = useParams();
  const { read: readDepositContract, getBitcoinAddress } = useDepositContract(
    depositAddress
  );
  const mintContext = useMint();
  // const { state } = useLocation();
  // const tbtc = useTBTCContract();
  // /** @type {[import('@keep-network/tbtc.js').Deposit|null|undefined, React.Dispatch<React.SetStateAction<import('@keep-network/tbtc.js').Deposit|null|undefined>>]} */
  // const [deposit, setDeposit] = useState(mintContext.deposit);
  /** @type {[TEvent|null|undefined, React.Dispatch<React.SetStateAction<TEvent|null|undefined>>]} */
  const [event, setEvent] = useState(mintContext.events[depositAddress]);
  /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
  const [lotSize, setLotSize] = useState('');
  const [deposit, setDeposit] = useState(mintContext.deposit);
  const [showWarn, setShowWarn] = useState(true);
  const [copy, setCopy] = useState(null);

  // useEffect(() => {
  //   if (tbtc && !mintContext.deposit) {
  //     tbtc.Deposit.withAddress(depositAddress)
  //       .then((resp) => {
  //         console.log({ resp });
  //         setDeposit(resp);
  //       })
  //       .catch((e) => {
  //         console.error({ e });
  //         setDeposit(null);
  //       });
  //   }
  // }, [depositAddress, tbtc, mintContext.deposit]);

  // useEffect(() => {
  //   if (deposit) {
  //     deposit.getLotSizeSatoshis().then(setLotSize);

  //     deposit.onBitcoinAddressAvailable(async (address) => {
  //       const lotSize = await deposit.getLotSizeSatoshis();
  //       console.log(
  //         '\tGot deposit address:',
  //         address,
  //         '; fund with:',
  //         lotSize.toString(),
  //         'satoshis please.'
  //       );
  //       console.log('Now monitoring for deposit transaction...');
  //     });
  //     deposit.onActive(async (deposit) => {
  //       console.log('Deposit is active, minting...');
  //       const tbtcBits = await deposit.mintTBTC();
  //       console.log(`Minted ${tbtcBits} TBTC bits!`);
  //       // or if you want some TDT action
  //       // deposit.depositTokenContract.transfer(someLuckyContract)
  //     });

  //     deposit.autoSubmit();
  //   }
  // }, [deposit]);

  useEffect(() => {
    if (event) {
      readDepositContract(['lotSizeSatoshis']).then(([lss]) => {
        setLotSize(lss);
      });
      console.log({ event });
      getBitcoinAddress({
        blockNumber: event.blockNumber,
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((er) => {
          console.error(er);
        });
    } else {
      (async () => {
        try {
          const createdEvent = await EthereumHelpers.getExistingEvent(
            systemContract.contract,
            'Created',
            { _depositContractAddress: depositAddress }
          );
          // console.log({ createdEvent });
          setEvent(createdEvent);
        } catch (e) {
          console.error({ e });
          setEvent(null);
        }
      })();
    }
  }, [
    readDepositContract,
    getBitcoinAddress,
    event,
    depositAddress,
    systemContract.contract,
  ]);

  if (event === null) {
    return <Redirect to="/mint" />;
  }

  if (event === undefined) {
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
              value={`bitcoin:${depositAddress}?amount=${amountInBtc}&label=Single-Use+tBTC+Deposit+Wallet`}
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
                value={depositAddress}
                readOnly
                className={s.copyInput}
              />
              <button
                type="button"
                onClick={() => copyToClipboard(depositAddress, setCopy)}
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
