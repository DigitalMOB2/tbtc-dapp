import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import cn from 'classnames';

import { StatusIndicator } from 'components/StatusIndicator';
import { Progress } from 'components/Progress';

import s from './s.module.css';

export default function Done() {
  /** @type {{ address: string }} */
  const { address } = useParams();

  useEffect(() => {
    // TODO: fetch BTC amount base on address from url
    console.log(address);
  }, [address]);

  return (
    <div className="page">
      <div className="heading">
        <h2 className="typography-h2">Success! You’ve got BTC.</h2>
      </div>

      <div className={s.container}>
        <div className={s.inner}>
          <StatusIndicator>
            <svg
              fill="none"
              viewBox="0 0 128 141"
              style={{ width: 128, height: 141, marginTop: -6 }}
            >
              <path
                fill="#080503"
                fillRule="evenodd"
                d="M49.297 23.662l-4.865 9.38 5.86 3L61.175 15.46 40.265 5.123l-2.99 5.852 9.485 4.781A64.003 64.003 0 0012.4 39.454 63.653 63.653 0 00.425 84.542a63.744 63.744 0 0022 41.163 64.127 64.127 0 0044.219 15.24 64.092 64.092 0 0042.805-18.827 63.707 63.707 0 0018.517-42.833 63.683 63.683 0 00-15.668-43.948 64.066 64.066 0 00-41.48-21.576 4.157 4.157 0 00-4.58 3.682 4.15 4.15 0 003.694 4.565 55.736 55.736 0 0136.087 18.771 55.401 55.401 0 0113.631 38.235 55.418 55.418 0 01-16.109 37.264 55.76 55.76 0 01-37.24 16.38 55.79 55.79 0 01-38.47-13.259A55.454 55.454 0 018.69 83.587a55.378 55.378 0 0110.418-39.226 55.683 55.683 0 0130.188-20.7z"
                clipRule="evenodd"
              />
              <path
                fill="#080503"
                d="M72.129 82.608c-.003 4.83-8.311 4.294-10.964 4.304l-.005-8.589c2.652-.009 10.961-.774 10.969 4.285zM61.167 66.62l-.01 7.78c2.214.006 9.141.513 9.133-3.896.014-4.6-6.914-3.9-9.123-3.884zM98.56 77.199c.01 19.034-15.483 34.47-34.56 34.453-19.095.01-34.572-15.411-34.56-34.451C29.43 58.166 44.901 42.736 64 42.747c19.073-.005 34.55 15.417 34.56 34.451zM68.11 62.155l.004-6.409-3.913-.002.001 6.244c-1.024 0-2.066.027-3.113.031l-.006-6.266-3.913-.003-.005 6.409c-.855.027-1.671.02-2.482.037l-.006-.022-5.404-.003-.008 4.157s2.9-.047 2.839-.009c1.584.001 2.093.92 2.246 1.717l.006 7.288-.011.05-.007 10.216c-.06.503-.351 1.295-1.47 1.294.055.033-2.838.01-2.838.01l-.77 4.648 5.074-.008c.954-.005 1.87.023 2.8.024l.013 6.474 3.913.002.004-6.408c1.074.011 2.105.034 3.13.034l-.01 6.387 3.913.002-.007-6.452c6.566-.378 11.182-2.037 11.74-8.188.463-4.944-1.887-7.17-5.602-8.056 2.275-1.146 3.68-3.167 3.348-6.544-.425-4.677-4.419-6.214-9.466-6.654z"
              />
            </svg>
          </StatusIndicator>

          <div className={s.amount}>
            <strong>1.00</strong> BTC
          </div>
          <div className={s.buttonsWrap}>
            <Link to="/redeem" className={cn(s.button, 'button', 'primary')}>
              DONE
            </Link>
          </div>
        </div>
        <div>
          <h2 className={cn('typography-h5', s.subTitle)}>Mint Progress</h2>
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
