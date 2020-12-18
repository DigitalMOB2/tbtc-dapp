import { useCallback, useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
// import BigNumber from 'bignumber.js';
import QR from 'qrcode.react';
// import { useTBTCContract } from 'hooks/wallet';
import { formatSatsToBtc, getEtherscanUrl } from 'utils/wallet';
import { copyToClipboard } from 'utils/copyToClipboard';
import { Svg } from 'components/Svg';
import { useMint } from '..';
import { useWallet } from 'context/wallet';
import { useSystemContract } from 'web3/contracts/system';
import { EthereumHelpers } from '@keep-network/tbtc.js';
import { useDepositContract } from 'web3/contracts/deposit';

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
    <div>
      <h2>Send BTC</h2>
      <div>
        Never send BTC from an exchange.
        <br />
        Make sure to send the exact amount of BTC displayed.
      </div>
      <h3>Amount</h3>
      <div>
        {amountInBtc} ฿TC
        <QR
          value={`bitcoin:${depositAddress}?amount=${amountInBtc}&label=Single-Use+tBTC+Deposit+Wallet`}
          renderAs="svg"
          size={225}
        />
      </div>
      <h3>Send to Address</h3>
      <div>
        {depositAddress}
        <button type="button" onClick={() => copyToClipboard(depositAddress)}>
          COPY
        </button>
      </div>
      <div>
        <Svg id="time" width="14" height="15" />
        Time remaining to fund address: 2 hours, 25 minutes.
      </div>
      <div>
        <a
          href={getEtherscanUrl(wallet.chainId, wallet.account)}
          target="_blank"
          rel="noopener noreferrer"
        >
          CHECK ETHERSCAN ↗︎
        </a>
        <a href="/" target="_blank" rel="noopener noreferrer">
          CHECK BITCOIN CHAIN ↗︎
        </a>
      </div>
    </div>
  );
}
