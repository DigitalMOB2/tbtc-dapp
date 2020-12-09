import BigNumber from 'bignumber.js';

/**
 * @param {number} [chainId]
 * @returns {string}
 */
export function getWSRpcUrl(
  chainId = Number(process.env.REACT_APP_WEB3_CHAIN_ID)
) {
  const WEB3_RPC_ID = String(process.env.REACT_APP_WEB3_RPC_ID);

  switch (chainId) {
    case 1:
      return `wss://mainnet.infura.io/ws/v3/${WEB3_RPC_ID}`;
    case 3:
      return `wss://ropsten.infura.io/ws/v3/${WEB3_RPC_ID}`;
    case 4:
      return `wss://rinkeby.infura.io/ws/v3/${WEB3_RPC_ID}`;
    default:
      throw new Error(`Not supported chainId=${chainId}.`);
  }
}

/**
 * @param {number} [chainId]
 * @returns {string}
 */
export function getHttpsRpcUrl(
  chainId = Number(process.env.REACT_APP_WEB3_CHAIN_ID)
) {
  const WEB3_RPC_ID = String(process.env.REACT_APP_WEB3_RPC_ID);

  switch (chainId) {
    case 1:
      return `https://mainnet.infura.io/v3/${WEB3_RPC_ID}`;
    case 3:
      return `https://ropsten-rpc.linkpool.io/${WEB3_RPC_ID}`;
    case 4:
      return `https://rinkeby.infura.io/v3/${WEB3_RPC_ID}`;
    default:
      throw new Error(`Not supported chainId=${chainId}.`);
  }
}

/**
 * @param {number} [decimals = 0]
 * @returns {BigNumber}
 */
export function getExponentValue(decimals = 0) {
  return new BigNumber(10).pow(decimals);
}

/**
 *
 * @param {BigNumber} [value]
 * @param {number} [decimals = 0]
 * @returns {BigNumber | undefined}
 */
export function getHumanValue(value, decimals = 0) {
  return value?.div(getExponentValue(decimals));
}
