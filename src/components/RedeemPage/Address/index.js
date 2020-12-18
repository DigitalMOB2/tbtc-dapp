import { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

export default function Address() {
  /** @type {{ address: string }} */
  const { address } = useParams();
  const history = useHistory();
  const [displayConfirm, setDisplayConfirm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const sendHandler = () => {
    history.push(`/redeem/${address}/confirmation`);
  };

  return (
    <>
      <h2>Where should your BTC go?</h2>
      <div>
        <h3>Deposit #{address}</h3>
        <span>courtesy called</span>
        1.0 BTC
      </div>

      <label htmlFor="">Redeem to Address</label>
      <input type="text" />
      <div>
        <button type="button">CANCEL</button>
        {confirmed ? (
          <button type="button" onClick={sendHandler}>
            SEND
          </button>
        ) : (
          <button type="button" onClick={() => setDisplayConfirm(true)}>
            CONFIRM
          </button>
        )}
      </div>
      {displayConfirm && (
        <div>
          Please confirm the Bitcoin address before sending.
          0x931D387731bBbC988B312206c74F77D004D6B84b67f32
          <button type="button" onClick={() => setConfirmed(false)}>
            IT’S WRONG
          </button>
          <button type="button" onClick={() => {
            setConfirmed(true)
            setDisplayConfirm(false)
          }}>
            IT’S CORRECT
          </button>
        </div>
      )}
    </>
  );
}
