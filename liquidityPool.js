// require('dotenv').config();
// const { Server, Networks, Keypair, TransactionBuilder, Operation, Asset, LiquidityPoolId, BASE_FEE } = require('stellar-sdk');

// // Set up the Stellar SDK to use the testnet
// // const server = new Server('https://horizon-testnet.stellar.org');
// // const networkPassphrase = Networks.TESTNET;

// // console.log('Server instance created successfully:', server);

// // Function to create a liquidity pool
// async function createLiquidityPool(issuerKeypair, asset1, asset2) {
//     try {
//         const account = await server.loadAccount(issuerKeypair.publicKey());
//         const fee = await server.fetchBaseFee();

//         const transaction = new TransactionBuilder(account, {
//             fee: fee || BASE_FEE,
//             networkPassphrase
//         })
//         .addOperation(Operation.liquidityPoolDeposit({
//             liquidityPoolId: LiquidityPoolId.fromAssets(asset1, asset2, 'constant_product'),
//             maxAmountA: "100", // Customize as needed
//             maxAmountB: "100", // Customize as needed
//             minPrice: "0.5", // Adjust pricing based on market rate
//             maxPrice: "2.0"
//         }))
//         .setTimeout(100)
//         .build();

//         transaction.sign(issuerKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Liquidity Pool Created: ${result.hash}`);
//         console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
//     } catch (error) {
//         console.error("Error creating liquidity pool:", error);
//     }
// }

// // Function to deposit assets into the liquidity pool
// async function depositIntoPool(userKeypair, poolId, amountA, amountB) {
//     try {
//         const account = await server.loadAccount(userKeypair.publicKey());
//         const fee = await server.fetchBaseFee();

//         const transaction = new TransactionBuilder(account, {
//             fee: fee || BASE_FEE,
//             networkPassphrase
//         })
//         .addOperation(Operation.liquidityPoolDeposit({
//             liquidityPoolId: poolId,
//             maxAmountA: amountA,
//             maxAmountB: amountB,
//             minPrice: "0.5",
//             maxPrice: "2.0"
//         }))
//         .setTimeout(100)
//         .build();

//         transaction.sign(userKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Assets Deposited: ${result.hash}`);
//         console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
//     } catch (error) {
//         console.error("Error depositing into liquidity pool:", error);
//     }
// }

// // Function to withdraw assets from the liquidity pool
// async function withdrawFromPool(userKeypair, poolId, amount) {
//     try {
//         const account = await server.loadAccount(userKeypair.publicKey());
//         const fee = await server.fetchBaseFee();

//         const transaction = new TransactionBuilder(account, {
//             fee: fee || BASE_FEE,
//             networkPassphrase
//         })
//         .addOperation(Operation.liquidityPoolWithdraw({
//             liquidityPoolId: poolId,
//             amount: amount, // Amount of pool shares to redeem
//             minAmountA: "0.1", // Minimum amount of asset A to receive
//             minAmountB: "0.1" // Minimum amount of asset B to receive
//         }))
//         .setTimeout(100)
//         .build();

//         transaction.sign(userKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Assets Withdrawn: ${result.hash}`);
//         console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
//     } catch (error) {
//         console.error("Error withdrawing from liquidity pool:", error);
//     }
// }

// // Function to perform a path payment using the liquidity pool
// async function performPathPayment(senderKeypair, receiverPublicKey, sendAsset, sendAmount, destAsset, destMin) {
//     try {
//         const account = await server.loadAccount(senderKeypair.publicKey());
//         const fee = await server.fetchBaseFee();

//         const transaction = new TransactionBuilder(account, {
//             fee: fee || BASE_FEE,
//             networkPassphrase
//         })
//         .addOperation(Operation.pathPaymentStrictReceive({
//             sendAsset: sendAsset,
//             sendAmount: sendAmount,
//             destination: receiverPublicKey,
//             destAsset: destAsset,
//             destMin: destMin,
//             path: [] // Empty path means direct exchange
//         }))
//         .setTimeout(100)
//         .build();

//         transaction.sign(senderKeypair);
//         const result = await server.submitTransaction(transaction);
//         console.log(`Path Payment Completed: ${result.hash}`);
//         console.log(`View transaction at: https://stellar.expert/explorer/testnet/tx/${result.hash}`);
//     } catch (error) {
//         console.error("Error performing path payment:", error);
//     }
// }

// // Main function to execute the operations
// (async function main() {
//     try {
//         // Replace with your Stellar keypairs and asset codes
//         const issuerKeypair = Keypair.fromSecret(process.env.ISSUER_SECRET);
//         const userKeypair = Keypair.fromSecret(process.env.USER_SECRET);
//         const asset1 = new Asset('ASSET1', issuerKeypair.publicKey());
//         const asset2 = new Asset('ASSET2', issuerKeypair.publicKey());
//         const poolId = LiquidityPoolId.fromAssets(asset1, asset2, 'constant_product');
        
//         // Example usage
//         await createLiquidityPool(issuerKeypair, asset1, asset2);
//         await depositIntoPool(userKeypair, poolId, "10", "20");
//         await performPathPayment(userKeypair, 'GBSQVOTZNGFRWMOT5U6ZCEGC56YFVZJGAUWLU273L2QUONE7NZ3TTRIR', asset1, '10', asset2, '5');
//         await withdrawFromPool(userKeypair, poolId, '5');
//     } catch (error) {
//         console.error("An error occurred in the main function:", error);
//     }
// })();
