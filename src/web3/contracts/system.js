import { useCallback } from 'react';
import Web3Contract from 'web3/contract';

/**
 * @typedef {'getAllowedLotSizes'|'getNewDepositFeeEstimate'} TMethodName
 */

/** @type {Object.<TMethodName, Object>} */
const gets = {
  getAllowedLotSizes: {
    method: 'getAllowedLotSizes',
    methodArgs: [],
    // transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  },
  getNewDepositFeeEstimate: {
    method: 'getNewDepositFeeEstimate',
    methodArgs: [],
    // transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  },
};

const contract = new Web3Contract(
  require('web3/abi/system.json'),
  process.env.REACT_APP_CONTRACT_SYSTEM_ADDR,
  'TBTC_SYSTEM'
);

export function useSystemContract() {
  const read = useCallback(
    /**
     * @param {TMethodName[]} data
     * @returns {Promise<any[]>}
     */
    (data) => {
      const configs = data.reduce((acc, methodName) => {
        const methodConfig = gets[methodName];
        if (methodConfig) {
          return [...acc, methodConfig];
        }

        console.error(`No config for "${methodName}" method`);
        return acc;
      }, []);

      return contract.batch(configs);
    },
    []
  );

  return { contract: contract.ethContract, read };
}
