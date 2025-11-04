import Head from 'next/head';
import { useBlockchain } from '@/context/BlockchainContext';
import { useState } from 'react';

export default function Home() {
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
    switchNetwork
  } = useBlockchain();
  
  const [fundAmount, setFundAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connectWallet();
      setMessage('Wallet connected successfully!');
    } catch (error: any) {
      setMessage(`Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      await disconnectWallet();
      setMessage('Wallet disconnected');
    } catch (error: any) {
      setMessage(`Disconnection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFund = async () => {
    if (!fundAmount || parseFloat(fundAmount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
    
    try {
      setLoading(true);
      await fund(fundAmount);
      setMessage('Funding successful!');
      setFundAmount('');
    } catch (error: any) {
      setMessage(`Funding failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      await withdraw();
      setMessage('Withdrawal successful!');
    } catch (error: any) {
      setMessage(`Withdrawal failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchNetwork = async () => {
    try {
      setLoading(true);
      await switchNetwork();
      setMessage('Network switched successfully!');
    } catch (error: any) {
      setMessage(`Network switch failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Fund Me DApp</title>
        <meta name="description" content="Ethereum-based funding application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Fund Me DApp</h1>
        
        {!isConnected ? (
          <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
            <button
              onClick={handleConnect}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? 'Connecting...' : 'Connect MetaMask'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Wallet Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">Wallet Information</h2>
                  <p className="text-gray-600">Address: {account?.substring(0, 6)}...{account?.substring(account.length - 4)}</p>
                  <p className="text-gray-600">Balance: {parseFloat(balance).toFixed(4)} ETH</p>
                  <p className="text-gray-600">Funded Amount: {parseFloat(fundedAmount).toFixed(4)} ETH</p>
                </div>
                <button
                  onClick={handleDisconnect}
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {loading ? 'Disconnecting...' : 'Disconnect'}
                </button>
              </div>
              
              {!isCorrectNetwork && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                  <p className="font-semibold">Warning: Incorrect Network</p>
                  <p>Please switch to the correct network</p>
                  <button
                    onClick={handleSwitchNetwork}
                    disabled={loading}
                    className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded disabled:opacity-50"
                  >
                    {loading ? 'Switching...' : 'Switch Network'}
                  </button>
                </div>
              )}
            </div>

            {/* Funding Function */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Fund</h2>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter funding amount (ETH)"
                  className="flex-1 border border-gray-300 rounded px-4 py-2"
                  step="0.0001"
                />
                <button
                  onClick={handleFund}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Fund'}
                </button>
              </div>
            </div>

            {/* Withdraw Function (Owner only) */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Withdraw</h2>
              <p className="text-gray-600 mb-4">Note: Only the contract owner can perform this operation</p>
              <button
                onClick={handleWithdraw}
                disabled={loading}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Withdraw'}
              </button>
            </div>
          </div>
        )}

        {/* Message Notification */}
        {message && (
          <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded max-w-md">
            <p>{message}</p>
          </div>
        )}
      </main>
    </div>
  );
}