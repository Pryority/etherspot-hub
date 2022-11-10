import React from 'react';

const MyNFTPanel = ({myNftList}) => {
  return (
    <div className='flex flex-col relative'>
      {myNftList ? 
        (
          <div className='flex flex-col p-4 absolute top-0 left-0 mx-auto'>
            {myNftList.map((nft, i) => (
              <div 
                key={i}
                className='p-[3.34px] hover:p-[4.25] hover:bg-green-600/10 hover:pr-8'
              >
                <h3 className='text-green-900 cursor-pointer transition-all text-sm ease-in-out hover:scale-105 duration-75 hover:pl-8 hover:font-medium p-2 w-full hover:uppercase truncate max-w-[300px]'>{nft.contractName}</h3>
              </div>
            ))
            }
          </div>
        )
        :
        (
          <div className='py-2 px-4 rounded-md text-white bg-red-600'>
            <h1>There are no categories in the database!</h1>
          </div>
        )
      }
    </div>
  );
};

export default MyNFTPanel;