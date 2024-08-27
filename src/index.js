require('dotenv').config();
const { server, networkPassphrase } = require('./config');
const { createLiquidityPool, depositIntoPool, withdrawFromPool, performPathPayment } = require('./liquidityPool');
const StellarSdk = require('stellar-sdk');

// Example usage
(async function main() {
    // Use environment variables for security
    const issuerKeypair = StellarSdk.Keypair.fromSecret(process.env.ISSUER_SECRET);
    const userKeypair = StellarSdk.Keypair.fromSecret(process.env.USER_SECRET);
    
    // Replace with actual asset codes and issuer public key
    const asset1 = new StellarSdk.Asset('ASSET1', issuerKeypair.publicKey());
    const asset2 = new StellarSdk.Asset('ASSET2', issuerKeypair.publicKey());
    const poolId = StellarSdk.LiquidityPoolId.assetPair(asset1, asset2);

    // Execute liquidity pool operations
    await createLiquidityPool(issuerKeypair, asset1, asset2);
    await depositIntoPool(userKeypair, poolId, "10", "20");
    await performPathPayment(userKeypair, 'GBSQVOTZNGFRWMOT5U6ZCEGC56YFVZJGAUWLU273L2QUONE7NZ3TTRIR', asset1, '10', asset2, '5');
    await withdrawFromPool(userKeypair, poolId, '5');
})();
