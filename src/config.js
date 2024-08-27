const StellarSdk = require ('stellar-sdk');
// Set up the Stellar SDK to use the testnet
const server = new StellarSdk.Horizon.Server ('https: //horizon-testnet.stellar.org');
const networkPassphrase = StellarSdk.Networks. TESTNET;
module.exports = { server, networkPassphrase };