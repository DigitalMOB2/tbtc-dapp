import { useCallback, useEffect } from 'react';
import { useWallet } from 'context/wallet';
import Web3Contract from 'web3/contract';

const contract = new Web3Contract(
  require('web3/abi/depositFactory.json'),
  process.env.REACT_APP_CONTRACT_DEPOSIT_FACTORY_ADDR,
  'TBTC_DEPOSIT_FACTORY'
);

export function useDepositFactoryContract() {
  const { account, provider } = useWallet();

  useEffect(() => {
    if (provider) {
      contract.setProvider(provider);
    }
  }, [provider]);

  const createDeposit = useCallback(
    /**s
     * @param {string} amount
     * @param {string} creationCost
     * @returns {Promise<string[]>}
     */
    (amount, creationCost) => {
      return contract.send('createDeposit', [amount], {
        from: account,
        value: creationCost,
      });
    },
    [account]
  );

  return { createDeposit };
}
