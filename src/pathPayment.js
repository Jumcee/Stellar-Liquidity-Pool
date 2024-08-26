const { server, networkPassphrase } = require('./config');
const { Keypair, TransactionBuilder, Operation, Asset } = require('stellar-sdk');

// Function to perform a path payment using the liquidity pool
async function performPathPayment(senderKeypair, receiverPublicKey, sendAsset, sendAmount, destAsset, destMin) {
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
}

module.exports = { performPathPayment };
