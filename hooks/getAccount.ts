import { Sdk, MetaMaskWalletProvider } from 'etherspot';

export default async function getAccount() {
    
  const output = await sdk.getAccount();
  
  console.log('account', output);
}