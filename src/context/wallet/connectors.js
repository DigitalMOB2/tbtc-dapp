import { InjectedConnector } from '@web3-react/injected-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';
import { TrezorConnector } from '@web3-react/trezor-connector';
import { getHttpsRpcUrl } from 'utils/web3';

const WEB3_POLLING_INTERVAL = Number(
  process.env.REACT_APP_WEB3_POLLING_INTERVAL
);
const WEB3_TREZOR_EMAIL = String(process.env.REACT_APP_WEB3_TREZOR_EMAIL);
const WEB3_TREZOR_APP_URL = String(process.env.REACT_APP_WEB3_TREZOR_APP_URL);

export const connectors = {
  /** @param {number} chainId */
  injected: (chainId) =>
    new InjectedConnector({
      supportedChainIds: [chainId],
    }),
  /** @param {number} chainId */
  ledger: (chainId) =>
    new LedgerConnector({
      chainId,
      url: getHttpsRpcUrl(chainId),
      pollingInterval: WEB3_POLLING_INTERVAL,
      baseDerivationPath: `m/44'/60'/0'/0`,
    }),
  /** @param {number} chainId */
  trezor: (chainId) =>
    new TrezorConnector({
      chainId: chainId,
      url: getHttpsRpcUrl(chainId),
      pollingInterval: WEB3_POLLING_INTERVAL,
      manifestEmail: WEB3_TREZOR_EMAIL,
      manifestAppUrl: WEB3_TREZOR_APP_URL,
    }),
};
