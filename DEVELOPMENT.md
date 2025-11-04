# Development Guide

## Project Structure

```
frontend-fund-me/
├── components/          # React components
├── context/             # React Context state management
├── hooks/               # Custom React Hooks
├── pages/               # Next.js page routes
├── styles/              # CSS style files
├── utils/               # Utility functions
├── public/              # Static assets
├── .env.local          # Local environment configuration
├── .env.sepolia        # Sepolia testnet configuration
├── .env.production     # Production environment configuration
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── postcss.config.js   # PostCSS configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Environment Configuration

The project supports three environments:

1. **Development** - Uses `.env.local` file
2. **Sepolia Testnet** - Uses `.env.sepolia` file
3. **Production** - Uses `.env.production` file

### Environment Variables

- `NEXT_PUBLIC_ENV` - Environment identifier (development/sepolia/production)
- `NEXT_PUBLIC_CONTRACT_ADDRESS` - Contract address
- `NEXT_PUBLIC_CHAIN_ID` - Network chain ID
- `NEXT_PUBLIC_RPC_URL` - RPC node URL

## Development Workflow

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Server will run at http://localhost:3000

### 3. Build for Production

```bash
npm run build
```

### 4. Start Production Server

```bash
npm start
```

## Functionality

### Wallet Connection
- Users can connect wallet via MetaMask
- Automatic network detection
- Network switching support

### Funding Function
- Users can fund the contract
- Real-time display of account balance and funded amount

### Withdraw Function
- Contract owner can withdraw funds
- Access limited to contract owner only

## Contract Interaction

DApp interacts with deployed smart contract:

- Contract Address: `0x0a2f65f50da5e32fd03569cda7af734d049fe0ba`
- Network: Sepolia Testnet
- Functions:
  - `fund()` - Fund (payable function)
  - `withdraw()` - Withdraw (contract owner only)
  - `getAddressToAmountFunded(address)` - Query funded amount for specific address

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain Interaction**: ethers.js v6
- **State Management**: React Context API

## Deployment

### Vercel Deployment
1. Push code to GitHub repository
2. Import project on Vercel
3. Set environment variables
4. Deployment complete

### Manual Deployment
1. Build project: `npm run build`
2. Copy `.next`, `public`, `package.json` and other files to server
3. Install production dependencies: `npm install --production`
4. Start server: `npm start`

## Important Notes

1. Ensure MetaMask wallet is installed and connected to correct network
2. Sepolia testnet requires test ETH
3. Contract owner withdrawal function requires deployer's private key
4. Infura key in environment variables needs to be replaced with actual key