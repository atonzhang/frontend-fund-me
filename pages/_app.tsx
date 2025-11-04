import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { BlockchainProvider } from '@/context/BlockchainContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BlockchainProvider>
      <Component {...pageProps} />
    </BlockchainProvider>
  );
}