/// <reference types="node" />
// Environment configuration management
export const getConfig = () => {
  const env = process.env.NEXT_PUBLIC_ENV || 'development';
  
  switch (env) {
    case 'production':
      return {
        env: 'production',
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '1'),
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
        explorerUrl: 'https://etherscan.io'
      };
    case 'sepolia':
      return {
        env: 'sepolia',
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
        explorerUrl: 'https://sepolia.etherscan.io'
      };
    case 'development':
    default:
      return {
        env: 'development',
        contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
        chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '11155111'),
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || '',
        explorerUrl: 'https://sepolia.etherscan.io'
      };
  }
};

export const config = getConfig();