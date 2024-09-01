require('dotenv').config();
const { server, networkPassphrase } = require('./config');
const { createLiquidityPool, depositIntoPool, withdrawFromPool, performPathPayment } = require('./liquidityPool');
const StellarSdk = require('stellar-sdk');
const { getLiquidityPoolId, Asset, LiquidityPoolFeeV18 } = require('stellar-sdk');
// import fetch from 'node-fetch';
const { fetch } = require('node-fetch');

// cargo install --locked soroban-cli@=21.0.0-rc.1
// cargo install soroban-cli@=21.0.0-rc.1

// soroban --version
// soroban 21.0.0-rc.1 or later.


// Example usage
(async function main() {
    // For the issuer (using public key)
const issuerKeypair = StellarSdk.Keypair.fromPublicKey(process.env.PUBLIC_KEY);

// For the user (using private/secret key)
const userKeypair = StellarSdk.Keypair.fromSecret(process.env.PRIVATE_KEY);
    
    // Replace with actual asset codes and issuer public key
    const asset1 = new StellarSdk.Asset('ASSET1', issuerKeypair.publicKey());
    const asset2 = new StellarSdk.Asset('ASSET2', issuerKeypair.publicKey());
    // const poolId = StellarSdk.LiquidityPoolId.assetPair(asset1, asset2);

     // Create the Liquidity Pool ID
    //  const poolId = StellarSdk.getLiquidityPoolId(
    //     'constant_product',
    //     {
    //         assetA: asset1,
    //         assetB: asset2,
    //         fee: StellarSdk.LiquidityPoolFeeV18
    //     }
    // ).toString('hex');

    const poolId = getLiquidityPoolId('constant_product', {
        assetA: asset1,
        assetB: asset2,
        fee: LiquidityPoolFeeV18
      });

    // Execute liquidity pool operations
    await createLiquidityPool(issuerKeypair, asset1, asset2);
    await depositIntoPool(userKeypair, poolId, "10", "20");
    await performPathPayment(userKeypair, 'GBSQVOTZNGFRWMOT5U6ZCEGC56YFVZJGAUWLU273L2QUONE7NZ3TTRIR', asset1, '10', asset2, '5');
    await withdrawFromPool(userKeypair, poolId, '5');
})();
