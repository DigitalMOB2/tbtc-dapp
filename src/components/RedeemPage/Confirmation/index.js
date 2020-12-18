import { useParams, useHistory } from 'react-router-dom';

export default function Confirmation() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  const history = useHistory();

  const claimHandler = () => {
    history.push(`/redeem/${address}/done`);
  };

  return (
    <>
      <h2>Redeeming...</h2>
      <div>
        <h3>Deposit #{address}</h3>
        <span>courtesy called</span>
        1.0 BTC
      </div>

      <ol>
        <li>SENT</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>DONE</li>
      </ol>

      <button type="button" onClick={claimHandler}>
        CLAIM BTC
      </button>
      <a href="/">check etherscan ↗︎</a>
      <button type="button">CANCEL</button>
    </>
  );
}
