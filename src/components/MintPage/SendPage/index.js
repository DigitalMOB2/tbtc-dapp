import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import QR from 'qrcode.react';
import { useTBTCContract } from 'hooks/wallet';
import { formatSatsToBtc, getEtherscanUrl } from 'utils/wallet';
import { copyToClipboard } from 'utils/copyToClipboard';
import { Svg } from 'components/Svg';
import { useMint } from '..';
import { useWallet } from 'context/wallet';

export default function SendPage() {
  const wallet = useWallet();
  let { address } = useParams();
  const mintContext = useMint();
  // const { state } = useLocation();
  const tbtc = useTBTCContract();
  const [deposit, setDeposit] = useState(mintContext.deposit);
  const [lotSize, setLotSize] = useState(0);

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
          value={`bitcoin:${address}?amount=${amountInBtc}&label=Single-Use+tBTC+Deposit+Wallet`}
          renderAs="svg"
          size={225}
        />
      </div>
      <h3>Send to Address</h3>
      <div>
        {address}
        <button type="button" onClick={() => copyToClipboard(address)}>
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
