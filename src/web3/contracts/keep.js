import { useCallback, useEffect } from 'react';
import { useWallet } from 'context/wallet';
import Web3Contract from 'web3/contract';

/**
 * @typedef {'getAllowedLotSizes'|'getNewDepositFeeEstimate'} TMethodName
 */

/** @type {Object.<TMethodName, Object>} */
const gets = {
  // getAllowedLotSizes: {
  //   method: 'getAllowedLotSizes',
  //   methodArgs: [],
  //   // transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  // },
  // getNewDepositFeeEstimate: {
  //   method: 'getNewDepositFeeEstimate',
  //   methodArgs: [],
  //   // transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
  // },
};

const contract = new Web3Contract(
  require('web3/abi/keep.json'),
  process.env.REACT_APP_CONTRACT_KEEP_ADDR,
  'TBTC_KEEP'
);

export function useKeepContract() {
  const { provider } = useWallet();

  useEffect(() => {
    if (provider) {
      contract.setProvider(provider);
    }
  }, [provider]);

  const read = useCallback(
    /**
     * @param {TMethodName[]} data
     * @returns {Promise<string[]>}
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
