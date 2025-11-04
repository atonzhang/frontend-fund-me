# Usage Instructions

## System Requirements

- Node.js 16.8 or higher
- npm 7 or higher
- MetaMask browser extension

## Quick Start

### 1. Clone Project
```bash
git clone <project-url>
cd frontend-fund-me
```

### 2. Run Setup Script
```bash
./setup.sh
```

Or manually install dependencies:
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Function Usage

### Connect Wallet
1. Ensure MetaMask browser extension is installed
2. Click "Connect MetaMask" button on the page
3. Confirm connection in MetaMask popup

### Fund
1. After connecting wallet, enter amount in funding area
2. Click "Fund" button
3. Confirm transaction in MetaMask
4. Wait for transaction confirmation

### Withdraw (Contract Owner Only)
1. Connect wallet address of contract owner
2. Click "Withdraw" button
3. Confirm transaction in MetaMask
4. Wait for transaction confirmation

### Network Switching
If incorrect network is detected:
1. Click "Switch Network" button
2. Confirm network switch in MetaMask

## Test Functions

Visit [http://localhost:3000/test](http://localhost:3000/test) to test all functions:

- Wallet connection test
- Funding function test
- Withdrawal function test
- Network switching test

## Obtain Sepolia Test Coins

To test on Sepolia testnet, you need to obtain test ETH:

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Connect your wallet address
3. Claim test ETH

Or use other faucets:
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://infura.io/faucet/sepolia)

## Common Issues

### 1. Page Displays Blank
- Check console for error messages
- Confirm all dependencies are installed correctly
- Restart development server

### 2. Unable to Connect Wallet
- Confirm MetaMask is installed and unlocked
- Check website permission settings
- Try refreshing the page

### 3. Transaction Failed
- Check if account balance is sufficient
- Confirm network connection is correct
- View error message in MetaMask

### 4. Environment Variables Not Taking Effect
- Confirm environment variable prefix is `NEXT_PUBLIC_`
- Restart development server
- Check if environment file name is correct

## Deployment

### Local Deployment
```bash
npm run build
npm start
```

### Vercel Deployment
1. Push code to GitHub repository
2. Import project on Vercel
3. Set environment variables
4. Deployment complete

## Technical Support

If you encounter issues, please check:
- [Next.js Documentation](https://nextjs.org/docs)
- [ethers.js Documentation](https://docs.ethers.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

Or contact project maintainers for assistance.