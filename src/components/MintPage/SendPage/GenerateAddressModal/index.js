import cn from 'classnames';
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
        <h2 className={cn('typography-h3', s.title)}>
          Generating Unique Address...
        </h2>
        <p className={cn('typography-h6', s.description)}>
          Powered by the Keep Random Beacon
        </p>
        <a
          href={getEtherscanUrl(wallet.chainId, wallet.account)}
          target="_blank"
          rel="noopener noreferrer"
          className="button secondary"
        >
          check etherscan ↗︎
        </a>
      </section>
    </div>
  );
}
