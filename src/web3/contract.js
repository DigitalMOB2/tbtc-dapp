// import Web3 from 'web3';
// import { Contract } from 'web3-eth-contract';
import Web3EthContract from 'web3-eth-contract';

import { getWSRpcUrl } from 'utils/web3';

// export type EthContract = Contract & Web3;

// export type BatchContractMethod = {
//   method: string;
//   methodArgs?: any[];
//   callArgs?: Record<string, any>;
//   transform?: (value: any) => any;
// };

export const DEFAULT_CONTRACT_PROVIDER = getWSRpcUrl();

const WEB3_ERROR_VALUE = 3.9638773911973445e75;

Web3EthContract.setProvider(DEFAULT_CONTRACT_PROVIDER);

class Web3Contract {
  ethContract;
  name;

  constructor(abi, address, name) {
    /** @type {import('web3-eth-contract').Contract} */
    this.ethContract = new Web3EthContract(abi, address);
    this.name = name;
  }

  setProvider(provider) {
    this.ethContract.setProvider(provider);
  }

  batch(methods) {
    const batch = new this.ethContract.BatchRequest();

    const promises = methods.map((method) => {
      return new Promise((resolve) => {
        const {
          method: methodName,
          methodArgs = [],
          callArgs = {},
          transform = (value) => value,
        } = method;

        const contractMethod = this.ethContract.methods[methodName];

        if (!contractMethod) {
          return resolve(undefined);
        }

        try {
          const request = contractMethod(...methodArgs).call.request(
            callArgs,
            (err, value) => {
              if (err) {
                console.error(`${this.name}:${methodName}.call`, err);
                return resolve(undefined);
              }

              if (+value === WEB3_ERROR_VALUE) {
                console.error(
                  `${this.name}:${methodName}.call`,
                  'Contract call failure!'
                );
                return resolve(undefined);
              }

              resolve(transform(value));
            }
          );

          batch.add(request);
        } catch (e) {
          return resolve(undefined);
        }
      });
    });

    batch.execute();

    return Promise.all(promises);
  }

  send(method, methodArgs = [], sendArgs = {}) {
    return new Promise(async (resolve, reject) => {
      const contractMethod = this.ethContract.methods[method];

      if (!contractMethod) {
        return resolve(undefined);
      }

      const gasPrice = await contractMethod(...methodArgs).estimateGas({
        ...sendArgs,
      });

      console.log({ gasPrice });

      contractMethod(...methodArgs)
        .send(
          {
            gas: gasPrice,
            ...sendArgs,
          },
          (err) => {
            if (err) {
              reject(err);
            }
          }
        )
        .then(resolve);
    });
  }
}

export default Web3Contract;
