import { UnsupportedChainIdError } from '@web3-react/core';
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector';
import { BitcoinHelpers } from '@keep-network/tbtc.js';
import BigNumber from 'bignumber.js';

BigNumber.set({ DECIMAL_PLACES: 8 });

/**
 * @param {number} [chainId]
 * @returns {string}
 */
export function getNetworkName(chainId) {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    default:
      return '';
  }
}

export function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.';
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return 'Please authorize this website to access your Ethereum account.';
  } else {
    console.error(error);
    return 'An unknown error occurred. Check the console for more details.';
  }
}

export function formatSatsToBtc(sats) {
  return new BigNumber(sats.toString())
    .div(BitcoinHelpers.satoshisPerBtc.toString())
    .toString();
}

export function getEtherscanUrl(chainId, address) {
  return `https://${
    chainId === 3 ? 'ropsten.' : ''
  }etherscan.io/address/${address}`;
}
