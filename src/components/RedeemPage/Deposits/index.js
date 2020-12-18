import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Deposits() {
  /** @type {[string|undefined, React.Dispatch<React.SetStateAction<string|undefined>>]} */
  const [address, setAddress] = useState();
  return (
    <>
      <label htmlFor="">Search or Paste Address</label>
      <input type="text" placeholder="Address" />

      <div>
        <div>
          <h2>All Deposits</h2>
          <select name="" id="">
            <option value="">Filter</option>
          </select>
          <ul>
            <li>
              <button type="button" onClick={() => setAddress('1')}>
                <h3>Deposit #123456</h3>
                <span>courtesy called</span>
                1.0 BTC
              </button>
            </li>
            <li>
            <button type="button" onClick={() => setAddress('2')}>
                <h3>Deposit #123456</h3>
                <span>normal</span>
                1.0 BTC
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h2>My Deposits</h2>
          <ul>
            <li>
            <button type="button" onClick={() => setAddress('3')}>
                <h3>Deposit #123456</h3>
                <span>normal</span>
                1.0 BTC
              </button>
            </li>
            <li>
              <button type="button" onClick={() => setAddress('4')}>
                <h3>Deposit #123456</h3>
                <span>normal</span>
                1.0 BTC
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Link to={`/redeem/${address}`} disabled={!address}>REDEEM NOW</Link>
      </div>
    </>
  );
}
