import { useCallback, useEffect, useMemo } from 'react';
import { BitcoinHelpers, EthereumHelpers } from '@keep-network/tbtc.js';
import { useWallet } from 'context/wallet';
import Web3Contract from 'web3/contract';
import { getBitcoinNetwork } from 'utils/web3';
import { useSystemContract } from './system';
import { useKeepContract } from './keep';

/**
 * @typedef {'lotSizeSatoshis'} TMethodName
 */

export function useDepositContract(address) {
  const { account, provider, web3, chainId } = useWallet();
  const systemContract = useSystemContract();
  const keepContract = useKeepContract();

  const contract = useMemo(() => {
    return new Web3Contract(
      require('web3/abi/deposit.json'),
      address,
      'TBTC_DEPOSIT'
    );
  }, [address]);

  /** @type {Object.<TMethodName, Object>} */
  const gets = useMemo(() => {
    return {
      lotSizeSatoshis: {
        method: 'lotSizeSatoshis',
        methodArgs: [],
        // transform: (value: string) => getHumanValue(new BigNumber(value), BONDTokenMeta.decimals),
      },
    };
  }, []);

  useEffect(() => {
    if (provider) {
      contract.setProvider(provider);
    }
  }, [contract, provider]);

  // const createDeposit = useCallback(
  //   /**s
  //    * @param {string} amount
  //    * @param {string} creationCost
  //    * @returns {Promise<string[]>}
  //    */
  //   (amount, creationCost) => {
  //     return contract.send('createDeposit', [amount], {
  //       from: account,
  //       value: creationCost,
  //     });
  //   },
  //   [account, contract]
  // );
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
    [contract, gets]
  );

  const getBitcoinAddress = useCallback(
    ({ blockNumber }) => {
      const readPublishedPubkeyEvent = async () => {
        return EthereumHelpers.getExistingEvent(
          systemContract.contract,
          'RegisteredPubkey',
          { _depositContractAddress: address },
          blockNumber
        );
      };

      const publicKeyPoint = async () => {
        const signerPubkeyEvent = await readPublishedPubkeyEvent();
        if (signerPubkeyEvent) {
          console.debug(
            `Found existing Bitcoin address for deposit ${address}...`
          );
          return {
            x: signerPubkeyEvent.returnValues._signingGroupPubkeyX,
            y: signerPubkeyEvent.returnValues._signingGroupPubkeyY,
          };
        }

        console.debug(`Waiting for deposit ${address} keep public key...`);

        // Wait for the Keep to be ready.
        await EthereumHelpers.getEvent(
          keepContract.contract,
          'PublicKeyPublished',
          {},
          blockNumber
        );

        console.debug(
          `Waiting for deposit ${address} to retrieve public key...`
        );
        // Ask the deposit to fetch and store the signer pubkey.
        const pubkeyTransaction = await EthereumHelpers.sendSafelyRetryable(
          contract.ethContract.methods.retrieveSignerPubkey(),
          {},
          false,
          5
        );

        console.debug(`Found public key for deposit ${address}...`);
        const {
          _signingGroupPubkeyX,
          _signingGroupPubkeyY,
        } = EthereumHelpers.readEventFromTransaction(
          web3,
          pubkeyTransaction,
          systemContract.contract,
          'RegisteredPubkey'
        );

        return {
          x: _signingGroupPubkeyX,
          y: _signingGroupPubkeyY,
        };
      };

      const publicKeyPointToBitcoinAddress = (publicKeyPoint) => {
        return BitcoinHelpers.Address.publicKeyPointToP2WPKHAddress(
          publicKeyPoint.x,
          publicKeyPoint.y,
          getBitcoinNetwork(chainId)
        );
      };

      return publicKeyPoint().then((point) =>
        publicKeyPointToBitcoinAddress(point)
      );
    },
    [
      address,
      chainId,
      systemContract.contract,
      keepContract.contract,
      web3,
      contract,
    ]
  );

  return { read, getBitcoinAddress };
}
