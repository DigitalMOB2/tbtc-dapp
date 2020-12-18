import { useParams, Link } from 'react-router-dom';

export default function Deposit() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  return (
    <>
      <label htmlFor="">Search or Paste Address</label>
      <input type="text" placeholder="Address" />

      <div>
        <h3>Deposit #{address}</h3>
        <span>courtesy called</span>
        1.0 BTC
      </div>

      <div>
        <div>0.1 TBTC > 0.09 ฿TC</div>
        <small>~$4670.35</small>
        <hr />
        <div>Security Fees</div>
        1% TBTC Signer Fee <span>0.01 TBTC</span>
        <hr />
        <div>Transfer Fees</div>
        Deposit Gas Fee <span>~0.1 ETH</span>
        <hr />
        Proof Gas Fee <span>~0.1 ETH</span>
        <hr />
        <div>Total Fees</div>
        ~$400.00*
      </div>

      <div>
        The security cost of this Mint is 10% of your deposit. This is higher
        than average. A larger lot size is recommended or wait until transfer
        fees are lower.
      </div>

      <Link to={`/redeem/${address}/address`}>CONFIRM</Link>
    </>
  );
}
