# Environment Configuration Guide

## Overview

This project supports three different environment configurations:

1. **Development Environment** (`.env.local`) - For local development
2. **Test Environment** (`.env.sepolia`) - For Sepolia testnet
3. **Production Environment** (`.env.production`) - For Ethereum mainnet

## Environment Variables

### NEXT_PUBLIC_ENV
Environment identifier:
- `development` - Development environment
- `sepolia` - Sepolia testnet
- `production` - Production environment

### NEXT_PUBLIC_CONTRACT_ADDRESS
Deployed smart contract address:
- Current address: `0x0a2f65f50da5e32fd03569cda7af734d049fe0ba`

### NEXT_PUBLIC_CHAIN_ID
Network chain ID:
- Ethereum Mainnet: `1`
- Sepolia Testnet: `11155111`

### NEXT_PUBLIC_RPC_URL
RPC node URL:
- Ethereum Mainnet: `https://mainnet.infura.io/v3/YOUR_INFURA_KEY`
- Sepolia Testnet: `https://sepolia.infura.io/v3/YOUR_INFURA_KEY`

### NEXT_PUBLIC_EXPLORER_URL
Blockchain explorer URL:
- Ethereum Mainnet: `https://etherscan.io`
- Sepolia Testnet: `https://sepolia.etherscan.io`

## Configuration Steps

### 1. Obtain Infura Key
1. Visit [Infura](https://infura.io/)
2. Register account or login
3. Create new project
4. Obtain project ID (API key)

### 2. Update Environment Files
Replace `YOUR_INFURA_KEY` in `.env.local`, `.env.sepolia` and `.env.production` files with actual Infura project ID.

For example:
```
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/1234567890abcdef1234567890abcdef
```

### 3. Verify Configuration
Ensure all environment files are configured correctly:
- Contract address is correct
- Chain ID is correct
- RPC URL contains valid Infura key

## Environment Switching

### Development Environment
Uses `.env.local` file by default, connects to Sepolia testnet.

### Test Environment
Uses `.env.sepolia` file, connects to Sepolia testnet.

### Production Environment
Uses `.env.production` file, connects to Ethereum mainnet.

## Important Notes

1. **Security**: Do not hardcode private keys or sensitive information in code
2. **Environment Variables**: Only environment variables prefixed with `NEXT_PUBLIC_` can be accessed in browser
3. **Key Management**: Safeguard Infura keys, do not commit to version control system
4. **Network Switching**: Users need to manually switch network in MetaMask or use app-provided network switching feature

## Troubleshooting

### Network Connection Issues
- Check if RPC URL is correct
- Verify Infura key is valid
- Confirm MetaMask network settings are correct

### Contract Interaction Issues
- Verify contract address is correct
- Check if contract ABI matches deployed contract
- Confirm network connection is normal

### Environment Variables Not Taking Effect
- Restart development server
- Check if environment variable prefix is `NEXT_PUBLIC_`
- Verify environment file name is correct