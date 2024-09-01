# Soroban Smart Contract Project

## Overview

This project implements a smart contract on the Soroban network, enabling decentralized financial operations on the Stellar blockchain. The primary functionalities include creating a liquidity pool, depositing and withdrawing assets, and performing path payments.

## Setup Instructions

### Prerequisites

1. **Rust and Cargo**: Ensure Rust and Cargo are installed.
   - Installation: [Rust Installation Guide](https://www.rust-lang.org/tools/install)

2. **Soroban-CLI**: Install Soroban CLI to interact with the Soroban network.
   - Install via Cargo:
     cargo install soroban-cli --version 21.0.0-rc.1 --locked

### Clone the Repository

git clone https://github.com/your-username/soroban-smart-contract.git

cd soroban-smart-contract

### Deploy the Smart Contract

soroban contract deploy --wasm target/wasm32-unknown-unknown/release/yourcontractname.wasm --network stellar-testnet

### Execute Transactions

Interact with your smart contract by performing actions such as creating a liquidity pool, depositing assets, and executing payments

soroban contract invoke --contract CONTRACT_ID --method METHOD_NAME --args ARGS --network
stellar-testnet

Replace CONTRACT_ID, METHOD_NAME, and ARGS with appropriate values