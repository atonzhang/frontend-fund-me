import { BrowserProvider, Contract, formatEther, parseEther } from 'ethers';
import { contractAbi } from './contract-abi';
import { config } from './config';

declare global {
  interface Window {
    ethereum: any;
  }
}

export class BlockchainService {
  private provider: BrowserProvider | null = null;
  private signer: any = null;
  private contract: Contract | null = null;

  // Connect wallet
  async connectWallet(): Promise<string[]> {
    console.log("config info: ", config);

    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        this.provider = new BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        
        // Initialize contract instance
        this.contract = new Contract(
          config.contractAddress,
          contractAbi,
          this.signer
        );
        
        return accounts;
      } catch (error) {
        console.error('Failed to connect wallet:', error);
        throw error;
      }
    } else {
      throw new Error('Please install MetaMask wallet');
    }
  }

  // Disconnect wallet
  async disconnectWallet(): Promise<void> {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Attempt to disconnect from MetaMask
        if (window.ethereum.removeAllListeners) {
          window.ethereum.removeAllListeners();
        }
        
        // Clear the provider and signer
        this.provider = null;
        this.signer = null;
        this.contract = null;
      } catch (error) {
        console.error('Failed to disconnect wallet:', error);
        throw error;
      }
    }
  }

  // Get current account balance
  async getBalance(): Promise<string> {
    if (!this.signer) {
      throw new Error('Please connect wallet first');
    }
    
    try {
      const balance = await this.signer.provider.getBalance(await this.signer.getAddress());
      return formatEther(balance);
    } catch (error) {
      console.error('Failed to get balance:', error);
      throw error;
    }
  }

  // Get the amount funded by user to the contract
  async getFundedAmount(address: string): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const amount = await this.contract.getAddressToAmountFunded(address);
      return formatEther(amount);
    } catch (error) {
      console.error('Failed to get funded amount:', error);
      throw error;
    }
  }

  // Fund the contract
  async fund(amount: string): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const tx = await this.contract.fund({
        value: parseEther(amount)
      });
      return await tx.wait();
    } catch (error) {
      console.error('Failed to fund:', error);
      throw error;
    }
  }

  // Withdraw (only for contract owner)
  async withdraw(): Promise<any> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }
    
    try {
      const tx = await this.contract.withdraw();
      return await tx.wait();
    } catch (error) {
      console.error('Failed to withdraw:', error);
      throw error;
    }
  }

  // Check if network is correct
  async checkNetwork(): Promise<boolean> {
    if (!this.provider) {
      throw new Error('Please connect wallet first');
    }
    
    try {
      const network = await this.provider.getNetwork();
      return network.chainId === BigInt(config.chainId);
    } catch (error) {
      console.error('Failed to check network:', error);
      throw error;
    }
  }

  // Switch network
  async switchNetwork(): Promise<void> {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('Please install MetaMask wallet');
    }
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${config.chainId.toString(16)}` }],
      });
    } catch (switchError: any) {
      // If network doesn't exist, add network
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${config.chainId.toString(16)}`,
                chainName: config.env === 'production' ? 'Ethereum Mainnet' : 'Sepolia Test Network',
                rpcUrls: [config.rpcUrl],
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                blockExplorerUrls: [config.explorerUrl]
              }
            ]
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
          throw addError;
        }
      } else {
        console.error('Failed to switch network:', switchError);
        throw switchError;
      }
    }
  }
}

export const blockchainService = new BlockchainService();