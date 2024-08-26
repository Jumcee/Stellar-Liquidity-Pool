require('dotenv').config();
const { server, networkPassphrase } = require('./config');
const createLiquidityPool = require('./liquidityPool');
const performPathPayment = require('./pathPayment');

(async function main() {
    try {
        // Replace with your Stellar keypairs and asset codes
        const issuerKeypair = Keypair.fromSecret(process.env.ISSUER_SECRET);
        const userKeypair = Keypair.fromSecret(process.env.USER_SECRET);
        const asset1 = new Asset('ASSET1', issuerKeypair.publicKey());
        const asset2 = new Asset('ASSET2', issuerKeypair.publicKey());
        const poolId = LiquidityPoolId.fromAssets(asset1, asset2, 'constant_product');

        // Example usage
        await createLiquidityPool(issuerKeypair, asset1, asset2);
        await depositIntoPool(userKeypair, poolId, "10", "20");
        await performPathPayment(userKeypair, 'GBSQVOTZNGFRWMOT5U6ZCEGC56YFVZJGAUWLU273L2QUONE7NZ3TTRIR', asset1, '10', asset2, '5');
        await withdrawFromPool(userKeypair, poolId, '5');
    } catch (error) {
        console.error("An error occurred in the main function:", error);
    }
})();
