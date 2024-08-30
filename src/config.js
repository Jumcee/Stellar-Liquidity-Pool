const StellarSdk = require('stellar-sdk');

// Use StellarSdk.Horizon.Server instead of StellarSdk.Server
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

const networkPassphrase = StellarSdk.Networks.TESTNET;

module.exports = { server, networkPassphrase };