import { Sdk, MetaMaskWalletProvider, NftList, NftCollection, Nft } from 'etherspot';
import { useEffect, useState } from 'react';
import MyNFTPanel from '../components/MyNFTPanel';
import Navbar from '../components/Navbar';

export default function Mainframe() {
  const [nftList, setNftList] = useState<(NftList | undefined)>();
  const [selectNfts, setSelectNfts] = useState<(Nft[] | undefined)>();
  const [isLoading, setIsLoading] = useState(false);
  const [queryContract, setQueryContract] = useState<string | undefined>('0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85');

  async function main() {
    if (!MetaMaskWalletProvider.detect()) {
      console.log('MetaMask not detected');
      return;
    }
        
    const walletProvider = await MetaMaskWalletProvider.connect();
        
    const sdk = new Sdk(walletProvider);

    console.info('🛠 ------- SDK created ');

    const account = await sdk.getAccount();
  
    console.log('🚹 ------- account', account);

    if (account) {
      const list = await sdk.getNftList({
        account: '0xA7B0BE5E0EC112c72096A43211Db3508D175F454',
      });

      console.log('NFT LIST', list);
      setNftList(list);

      if (list) {
        setCollection(list);
      }
    }
  }

  const setCollection = async (list:any) => {
    if (queryContract != null) {
      const setList = list.items.filter((nft:NftCollection | undefined) => nft?.contractAddress === queryContract);
      console.log('SELECTED NFT COLLECTION:', setList[0].contractName);
      // getCertainNfts(nftList);
      setSelectNfts(setList[0].items);
      console.log('SELECTED NFT COLLECTION TOKENS:', setList[0].items);
    }
  };

  const updateQueryContract = async (e:any) => {
    setQueryContract(e.target.value);
    setCollection(queryContract);
  };

  useEffect(()=>{
    main().catch(console.error);
  },[]);
  
  return (
    <div className='flex flex-col min-h-screen w-full items-center justify-center bg-gradient-to-b from-transparent to-green-100/10'>

      <Navbar/>

      <input
        value={queryContract}
        onChange={updateQueryContract}
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
                <MyNFTPanel nftList={nftList}/>
              </section>
              {/* PRODUCTS PANEL */}
              <section className='flex flex-col col-span-5 w-full h-full p-4'>
                <div className='flex flex-col w-full min-h-screen relative'>
                  <div className='flex flex-col p-2 w-full h-full absolute items-center bg-green-600/10 border-2 border-green-700/20'>
                    <div className='grid grid-cols-2 justify-center items-center w-full'>
                      {!nftList ? (
                        <div className='flex p-2 justify-center'>
                          <div className='flex flex-col h-64 w-64 bg-black/20 relative rounded'>
                            {/* <Image 
                            src={nft.image ? nft.image : ''} 
                            alt=''
                            // layout='fill absolute'
                            width={64}
                            height={64}
                          /> */}
                            {/* <img src={nft.image} alt=''/> */}
                            <div className='absolute bottom-2 left-2 flex flex-col space-y-2'>
                              <h3 className='text-[18px] font-light'>Loading...</h3>
                              <p></p>
                            </div>
                          </div>
                        </div>
                      ):
                        (
                          <>
                            {!selectNfts ? (
                              <div>
                                Loading...
                              </div>
                            ):
                              <>
                                {selectNfts?.map((nft)=>(
                                  <div key={nft.tokenId} className='flex p-2 justify-center'>
                                    <div className='flex flex-col h-64 w-64 bg-black/20 relative rounded'>
                                      <img src={nft.image} alt='' className='hover:scale-105 transitin-all duration-75 ease-in-out'/>
                                      {/* <div className='absolute bottom-2 left-2 flex flex-col space-y-2'>
                                        <h3 className='text-[18px] font-light'>{nft.name}</h3>
                                        <p>1 ETH</p>
                                      </div> */}
                                    </div>
                                  </div>
                                ))}
                              </>
                            }
                          </>
                        )
                      }
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
