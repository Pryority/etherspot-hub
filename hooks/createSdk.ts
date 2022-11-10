import { Sdk, MetaMaskWalletProvider } from 'etherspot';

export default async function createSdk() {
  if (!MetaMaskWalletProvider.detect()) {
    console.log('MetaMask not detected');
    return;
  }
    
  const walletProvider = await MetaMaskWalletProvider.connect();
    
  const sdk = new Sdk(walletProvider);
    
  console.info('SDK created');

  return {sdk};
}