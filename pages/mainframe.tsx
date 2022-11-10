import Head from 'next/head';
import { Sdk, MetaMaskWalletProvider } from 'etherspot';
import { useEffect, useState } from 'react';
import { BigNumber, Bytes } from 'ethers';
import MyNFTPanel from '../components/MyNFTPanel';
import Navbar from '../components/Navbar';

enum TokenTypes {
  Erc20 = 'Erc20',
  Erc721 = 'Erc721',
  Erc1155 = 'Erc1155',
  Native = 'Native',
  WrappedSupertoken = 'WrappedSupertoken'
}

interface Nft {
  tokenId: number;
  name: string;
  amount: number;
  image: string;
  ipfsGateway: string;
}

interface NftCollection  {
  contractName: string;
  contractSymbol: string;
  contractAddress: string;
  tokenType: TokenTypes;
  nftVersion: string;
  nftDescription: string;
  balance: number;
  items: Nft[];
}

export default function Mainframe() {
  const [allNfts, setAllNfts] = useState<(NftCollection[])>([]);
  const [selectNfts, setSelectNfts] = useState<(Nft[] | undefined)>();
  const [isLoading, setIsLoading] = useState(false);
  const [queryContract, setQueryContract] = useState('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');

  async function main() {
    if (!MetaMaskWalletProvider.detect()) {
      console.log('MetaMask not detected');
      return;
    }
        
    const walletProvider = await MetaMaskWalletProvider.connect();
        
    const sdk = new Sdk(walletProvider);

    console.info('🛠 ------- SDK created ');

    const output = await sdk.getAccount();
  
    console.log('🚹 ------- account', output);

    const list = await sdk.getNftList({
      account: '0xA7B0BE5E0EC112c72096A43211Db3508D175F454',
    });
    
    setAllNfts(list.items);

    console.log('------- Nft List', {allNfts});
    const tokens = {allNfts};
    getCertainNfts();
  }

  const getCertainNfts = async () => {

    const contract = allNfts.filter((nft:NftCollection) => nft.contractAddress === queryContract);
    setSelectNfts(contract[0].items);
    console.log('A LIST OF A CERTAIN PROJECTs NFTS!', selectNfts);
  };

  useEffect(()=>{
    main().catch(console.error);
  },[]);
  
  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b from-transparent to-green-100/10'>

      <Navbar/>

      <input
        value={queryContract}
        onChange={(e) => setQueryContract(e.target.value)}
        type="text"
        placeholder="Enter an NFT Smart Contract Address (eg. 0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85)"
        className={`placeholder:text-gray-600 flex w-5/6 mx-auto text-primary rounded-md h-12 p-2 bg-1 verification-outline border ${queryContract ? 'border-lime-500 border-solid' : 'hover:border-solid hover:border-stone-300'} focus:outline-none`}
      />
      
      <main className='flex flex-col min-h-screen w-full'>
        {isLoading ? (
          <>
            {/* <Skeleton /> */}
            <h1 className='text-4xl'>{isLoading}</h1>
          </>
        ):
          (
            <div className='grid grid-cols-8 w-full h-full'>
              <section className='col-span-3 flex flex-col h-full w-full'>
                <MyNFTPanel allNfts={allNfts}/>
              </section>
              {/* PRODUCTS PANEL */}
              <section className='flex flex-col col-span-5 w-full h-full p-4'>
                <div className='flex flex-col w-full min-h-screen relative'>
                  <div className='flex flex-col p-2 w-full h-full absolute items-center bg-green-600/10 border-2 border-green-700/20'>
                    <div className='grid grid-cols-2 justify-center items-center w-full'>
                      {selectNfts?.map((nft)=>(
                        <div key={nft.tokenId} className='flex p-2 justify-center'>
                          <div className='flex flex-col h-64 w-64 bg-black/20 relative rounded'>
                            <div className='absolute bottom-2 left-2 flex flex-col space-y-2'>
                              <h3 className='text-[18px] font-light uppercase'>{nft.name}</h3>
                              <p>1 ETH</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='flex p-2 justify-center'>
                        <div className='flex flex-col h-64 w-64 bg-black/20 relative rounded'>
                          <div className='absolute bottom-2 left-2 flex flex-col space-y-2'>
                            <h3 className='text-[18px] font-light uppercase'>Title</h3>
                            <p>Price</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )
        }
      </main>
    </div>
  );
}
