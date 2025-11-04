import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { blockchainService } from '@/utils/blockchain';

interface BlockchainContextType {
  account: string | null;
  balance: string;
  fundedAmount: string;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  fund: (amount: string) => Promise<void>;
  withdraw: () => Promise<void>;
  refreshData: () => Promise<void>;
  switchNetwork: () => Promise<void>;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

interface BlockchainProviderProps {
  children: ReactNode;
}

export const BlockchainProvider: React.FC<BlockchainProviderProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [fundedAmount, setFundedAmount] = useState<string>('0');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(true);

  // Connect wallet
  const connectWallet = async () => {
    try {
      const accounts = await blockchainService.connectWallet();
      const walletAddress = accounts[0];
      setAccount(walletAddress);
      setIsConnected(true);
      
      // Check network
      const correctNetwork = await blockchainService.checkNetwork();
      setIsCorrectNetwork(correctNetwork);
      
      // Refresh data with the new account address
      await refreshData(walletAddress);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      await blockchainService.disconnectWallet();
      setAccount(null);
      setBalance('0');
      setFundedAmount('0');
      setIsConnected(false);
      setIsCorrectNetwork(true);
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  };

  // Refresh data
  const refreshData = async (accountAddress?: string) => {
    const address = accountAddress || account;
    if (!address) return;
    
    try {
      // Get balance
      const bal = await blockchainService.getBalance();
      setBalance(bal);
      
      // Get funded amount
      const funded = await blockchainService.getFundedAmount(address);
      setFundedAmount(funded);
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  };

  // Fund
  const fund = async (amount: string) => {
    if (!account) throw new Error('Please connect wallet first');
    
    try {
      await blockchainService.fund(amount);
      // Refresh data after funding
      await refreshData();
    } catch (error) {
      console.error('Failed to fund:', error);
      throw error;
    }
  };

  // Withdraw
  const withdraw = async () => {
    if (!account) throw new Error('Please connect wallet first');
    
    try {
      await blockchainService.withdraw();
      // Refresh data after withdrawal
      await refreshData();
    } catch (error) {
      console.error('Failed to withdraw:', error);
      throw error;
    }
  };

  // Switch network
  const switchNetwork = async () => {
    try {
      await blockchainService.switchNetwork();
      setIsCorrectNetwork(true);
      // Refresh data after network switch
      await refreshData();
    } catch (error) {
      console.error('Failed to switch network:', error);
      throw error;
    }
  };

  // Listen to account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected
        disconnectWallet();
      } else {
        // Account changed
        setAccount(accounts[0]);
        refreshData(accounts[0]);
      }
    };

    const handleChainChanged = () => {
      // Network changed, refresh data
      blockchainService.checkNetwork().then(setIsCorrectNetwork);
      refreshData();
    };

    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const value = {
    account,
    balance,
    fundedAmount,
    isConnected,
    isCorrectNetwork,
    connectWallet,
    disconnectWallet,
    fund,
    withdraw,
    refreshData,
    switchNetwork
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};