/**
 * @param {number} [chainId]
 * @returns {string}
 */
export function getNetworkName(chainId) {
  switch (chainId) {
    case 1:
      return 'Mainnet';
    case 4:
      return 'Rinkeby';
    default:
      return '';
  }
}
