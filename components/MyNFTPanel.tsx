import { NftCollection, NftList } from 'etherspot';
import React, { useEffect, useState } from 'react';

interface NFTPanelProps {
  nftList?: NftCollection[];
}

const MyNFTPanel = ({nftList}:NFTPanelProps) => {
  const [nftCollections, setNftCollections] = useState<NftCollection[] | undefined>();

  useEffect(()=>{
    setNftCollections(nftList);
  });

  return (
    <div className='flex flex-col relative'>
      {nftList ? 
        (
          <div className='flex flex-col p-4 absolute top-0 left-0 mx-auto'>
            {/* {for.map(() => (
              <div 
                key={index}
                className='p-[3.34px] hover:p-[4.25] hover:bg-green-600/10 hover:pr-8'
                onClick={(e) => handleClick(e, collection.contractAddress)}
              >
                <h3 className='text-green-900 cursor-pointer transition-all text-sm ease-in-out hover:scale-105 duration-75 hover:pl-8 hover:font-medium p-2 w-full hover:uppercase truncate max-w-[300px]'>{collection.contractName}</h3>
              </div>
            ))
            } */}
            {nftCollections?.map((collection: NftCollection, index: number) => (
              <div 
                key={index}
                className='p-[3.34px] hover:p-[4.25] hover:bg-green-600/10 hover:pr-8'
              >
                <h3 className='text-green-900 cursor-pointer transition-all text-sm ease-in-out hover:scale-105 duration-75 hover:pl-8 hover:font-medium p-2 w-full hover:uppercase truncate max-w-[300px]'>{collection.contractName}</h3>
              </div>
            ))
            }
          </div>
        )
        :
        (
          <div className='flex flex-col p-4 absolute top-0 left-0 mx-auto'>
            <div 
              key={'test'}
              className='p-[3.34px] hover:p-[4.25] hover:bg-green-600/10 hover:pr-8'
            >
              <h3 className='text-green-900 cursor-pointer transition-all text-sm ease-in-out hover:scale-105 duration-75 hover:pl-8 hover:font-medium p-2 w-full hover:uppercase truncate max-w-[300px]'>Loading...</h3>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default MyNFTPanel;