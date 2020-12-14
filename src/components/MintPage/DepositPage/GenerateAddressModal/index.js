import { useWallet } from 'context/wallet';
import { getEtherscanUrl } from 'utils/wallet';
import { Svg } from 'components/Svg';
import s from './s.module.css';

export function GenerateAddressModal() {
  const wallet = useWallet();

  return (
    <div className={s.modal}>
      <section className={s.modalContent}>
        <Svg id="keep-random-beacon" width="80" height="116" />
        <h2>Generating Unique Address...</h2>
        <p>Powered by the Keep Random Beacon</p>
        <a
          href={getEtherscanUrl(wallet.chainId, wallet.account)}
          target="_blank"
          rel="noopener noreferrer"
        >
          check etherscan ↗︎
        </a>
      </section>
    </div>
  );
}
