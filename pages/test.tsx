import { useEffect, useState } from 'react';
import { useBlockchain } from '@/context/BlockchainContext';

export default function TestPage() {
  const { 
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
  } = useBlockchain();
  
  const [testAmount, setTestAmount] = useState<string>('0.01');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleTestConnection = async () => {
    try {
      setLoading(true);
      setStatus('Connecting wallet...');
      await connectWallet();
      setStatus('Wallet connected successfully!');
    } catch (error: any) {
      setStatus(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestFund = async () => {
    if (!testAmount || parseFloat(testAmount) <= 0) {
      setStatus('Please enter a valid amount');
      return;
    }
    
    try {
      setLoading(true);
      setStatus('Funding...');
      await fund(testAmount);
      setStatus('Funding successful!');
      await refreshData();
    } catch (error: any) {
      setStatus(`Funding failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestWithdraw = async () => {
    try {
      setLoading(true);
      setStatus('Withdrawing...');
      await withdraw();
      setStatus('Withdrawal successful!');
      await refreshData();
    } catch (error: any) {
      setStatus(`Withdrawal failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTestNetwork = async () => {
    try {
      setLoading(true);
      setStatus('Switching network...');
      await switchNetwork();
      setStatus('Network switched successfully!');
    } catch (error: any) {
      setStatus(`Network switch failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      await disconnectWallet();
      setStatus('Wallet disconnected successfully!');
    } catch (error: any) {
      setStatus(`Disconnection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">DApp Function Test</h2>
          
          {/* Status Display */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800">Status Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              Connection Status: {isConnected ? 'Connected' : 'Disconnected'}
            </p>
            <p className="text-sm text-gray-600">
              Network Status: {isCorrectNetwork ? 'Correct' : 'Incorrect'}
            </p>
            {account && (
              <p className="text-sm text-gray-600">
                Account: {account.substring(0, 6)}...{account.substring(account.length - 4)}
              </p>
            )}
            {balance && (
              <p className="text-sm text-gray-600">
                Balance: {parseFloat(balance).toFixed(4)} ETH
              </p>
            )}
            {fundedAmount && (
              <p className="text-sm text-gray-600">
                Funded Amount: {parseFloat(fundedAmount).toFixed(4)} ETH
              </p>
            )}
          </div>
          
          {/* Status Message */}
          {status && (
            <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-lg">
              {status}
            </div>
          )}
          
          {/* Test Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleTestConnection}
              disabled={loading || isConnected}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                isConnected 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading && !isConnected ? 'Connecting...' : isConnected ? 'Connected' : 'Test Wallet Connection'}
            </button>
            
            <div className="flex space-x-2">
              <input
                type="number"
                value={testAmount}
                onChange={(e) => setTestAmount(e.target.value)}
                placeholder="Amount"
                className="flex-1 border border-gray-300 rounded-md px-3 py-2"
                step="0.0001"
              />
              <button
                onClick={handleTestFund}
                disabled={loading || !isConnected}
                className={`py-2 px-4 rounded-md text-white font-medium ${
                  !isConnected 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {loading ? 'Funding...' : 'Test Funding'}
              </button>
            </div>
            
            <button
              onClick={handleTestWithdraw}
              disabled={loading || !isConnected}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                !isConnected 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {loading ? 'Withdrawing...' : 'Test Withdrawal'}
            </button>
            
            {!isCorrectNetwork && (
              <button
                onClick={handleTestNetwork}
                disabled={loading}
                className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md"
              >
                {loading ? 'Switching...' : 'Test Network Switch'}
              </button>
            )}
            
            {isConnected && (
              <button
                onClick={handleDisconnect}
                disabled={loading}
                className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md"
              >
                {loading ? 'Disconnecting...' : 'Disconnect'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}