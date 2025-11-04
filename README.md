# Fund Me DApp

This is an Ethereum-based funding DApp that allows users to donate to a contract and enables the contract owner to withdraw funds.

## Features

- Connect MetaMask wallet
- View account balance and funded amount
- Fund the contract
- Withdraw funds (contract owner only)
- Multi-network support (Sepolia testnet and Ethereum mainnet)

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- ethers.js v6
- React Context API

## Environment Configuration

The project supports three environment configurations:

1. **Development** (`development`) - For local development, connects to Sepolia testnet by default
2. **Test** (`sepolia`) - Sepolia testnet configuration
3. **Production** (`production`) - Ethereum mainnet configuration

Environment configuration files:
- `.env.local` - Local development environment
- `.env.sepolia` - Sepolia testnet environment
- `.env.production` - Production environment

## Installation and Running

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Contract Interaction

This DApp interacts with a smart contract deployed on the Sepolia testnet:
- Contract Address: `0x0a2f65f50da5e32fd03569cda7af734d049fe0ba`
- Supported Functions:
  - `fund()` - Fund the contract
  - `withdraw()` - Withdraw funds (contract owner only)
  - `getAddressToAmountFunded(address)` - Query the funded amount for a specific address

## Configuration Notes

In the environment configuration files, replace the following placeholders:
- `YOUR_INFURA_KEY` - Replace with your Infura project key

## Important Notes

1. Make sure MetaMask browser extension is installed
2. Ensure your wallet has sufficient ETH for transaction fees
3. When testing on Sepolia testnet, you need to obtain Sepolia ETH test coins