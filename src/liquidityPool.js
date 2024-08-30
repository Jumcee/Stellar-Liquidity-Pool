const { server, networkPassphrase } = require('./config');
const { Keypair, TransactionBuilder, Operation, Asset, LiquidityPoolId } = require('stellar-sdk');

/**
 * Create a liquidity pool on Stellar.
 * @param {Keypair} issuerKeypair - The keypair of the issuer creating the pool.
 * @param {Asset} asset1 - The first asset for the liquidity pool.
 * @param {Asset} asset2 - The second asset for the liquidity pool.
 */

async function createLiquidityPool(issuerKeypair, asset1, asset2) {
    try {
        const account = await server.loadAccount(issuerKeypair.publicKey());
        const fee = await server.fetchBaseFee();

        const transaction = new TransactionBuilder(account, {
            fee,
            networkPassphrase
        })
        .addOperation(Operation.liquidityPoolDeposit({
            liquidityPoolId: LiquidityPoolId.fromAssets(asset1, asset2, 'constant_product'),
            maxAmountA: "100", // Customize as needed
            maxAmountB: "100", // Customize as needed
            minPrice: "0.5", // Adjust pricing based on market rate
            maxPrice: "2.0"
        }))
        .setTimeout(100)
        .build();

        transaction.sign(issuerKeypair);
        const result = await server.submitTransaction(transaction);
        console.log(`Liquidity Pool Created: ${result.hash}`);
        console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
    } catch (error) {
        console.error('Error creating liquidity pool:', error);
    }
}

/**
 * Deposit assets into an existing liquidity pool.
 * @param {Keypair} userKeypair - The keypair of the user depositing the assets.
 * @param {string} poolId - The ID of the liquidity pool.
 * @param {string} amountA - The amount of asset A to deposit.
 * @param {string} amountB - The amount of asset B to deposit.
 */
async function depositIntoPool(userKeypair, poolId, amountA, amountB) {
    try {
        const account = await server.loadAccount(userKeypair.publicKey());
        const fee = await server.fetchBaseFee();

        const transaction = new TransactionBuilder(account, {
            fee,
            networkPassphrase
        })
        .addOperation(Operation.liquidityPoolDeposit({
            liquidityPoolId: poolId,
            maxAmountA: amountA,
            maxAmountB: amountB,
            minPrice: "0.5",
            maxPrice: "2.0"
        }))
        .setTimeout(100)
        .build();

        transaction.sign(userKeypair);
        const result = await server.submitTransaction(transaction);
        console.log(`Assets Deposited: ${result.hash}`);
        console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
    } catch (error) {
        console.error('Error depositing into liquidity pool:', error);
    }
}

/**
 * Withdraw assets from a liquidity pool.
 * @param {Keypair} userKeypair - The keypair of the user withdrawing the assets.
 * @param {string} poolId - The ID of the liquidity pool.
 * @param {string} amount - The amount of pool shares to redeem.
 */
async function withdrawFromPool(userKeypair, poolId, amount) {
    try {
        const account = await server.loadAccount(userKeypair.publicKey());
        const fee = await server.fetchBaseFee();

        const transaction = new TransactionBuilder(account, {
            fee,
            networkPassphrase
        })
        .addOperation(Operation.liquidityPoolWithdraw({
            liquidityPoolId: poolId,
            amount: amount, // Amount of pool shares to redeem
            minAmountA: "0.1", // Minimum amount of asset A to receive
            minAmountB: "0.1" // Minimum amount of asset B to receive
        }))
        .setTimeout(100)
        .build();

        transaction.sign(userKeypair);
        const result = await server.submitTransaction(transaction);
        console.log(`Assets Withdrawn: ${result.hash}`);
        console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
    } catch (error) {
        console.error('Error withdrawing from liquidity pool:', error);
    }
}

/**
 * Perform a path payment using the liquidity pool.
 * @param {Keypair} senderKeypair - The keypair of the sender.
 * @param {string} receiverPublicKey - The public key of the receiver.
 * @param {Asset} sendAsset - The asset to send.
 * @param {string} sendAmount - The amount to send.
 * @param {Asset} destAsset - The destination asset.
 * @param {string} destMin - The minimum amount of the destination asset to receive.
 */
async function performPathPayment(senderKeypair, receiverPublicKey, sendAsset, sendAmount, destAsset, destMin) {
    try {
        const account = await server.loadAccount(senderKeypair.publicKey());
        const fee = await server.fetchBaseFee();

        const transaction = new TransactionBuilder(account, {
            fee,
            networkPassphrase
        })
        .addOperation(Operation.pathPaymentStrictReceive({
            sendAsset: sendAsset,
            sendAmount: sendAmount,
            destination: receiverPublicKey,
            destAsset: destAsset,
            destMin: destMin,
            path: [] // Empty path means direct exchange
        }))
        .setTimeout(100)
        .build();

        transaction.sign(senderKeypair);
        const result = await server.submitTransaction(transaction);
        console.log(`Path Payment Completed: ${result.hash}`);
        console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
    } catch (error) {
        console.error('Error performing path payment:', error);
    }
}

module.exports = {
    createLiquidityPool,
    depositIntoPool,
    withdrawFromPool,
    performPathPayment
};
