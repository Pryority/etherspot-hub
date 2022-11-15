import { NftCollection, NftList } from 'etherspot';
import React, { useEffect, useState } from 'react';

interface NFTPanelProps {
  nftList?: (items: NftCollection[]) => NftList;

  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, address: string) => void;
}

const MyNFTPanel = ({nftList, handleClick}:NFTPanelProps) => {

  const employees = [
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
    {id: 1, id2: '0'},
  ];

  const results = [];

  // 👇️ can use forEach outside of your JSX code
  // if you need to call a function once for each array element
  employees.forEach((employee, index) => {
    results.push(
      <div key={index}>
        <h2>{employee.id}</h2>
      </div>
    );
  });
  
  return (
    <div className='flex flex-col relative'>
      <div className='grid grid-cols-5 w-full gap-1'>
        {employees.map((employee, index) => {
          return (
            <div key={index} className='bg-red-500 w-4 h-4 justify-center items-center flex p-1 text-xs rounded-full'>
              <h2>{employee.id}</h2>
            </div>
          );
        })}
      </div>

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
            {/* {nftList.items.map((collection: NftCollection, index: number) => (
              <div 
                key={index}
                className='p-[3.34px] hover:p-[4.25] hover:bg-green-600/10 hover:pr-8'
                onClick={(e) => handleClick(e, collection.contractAddress)}
              >
                <h3 className='text-green-900 cursor-pointer transition-all text-sm ease-in-out hover:scale-105 duration-75 hover:pl-8 hover:font-medium p-2 w-full hover:uppercase truncate max-w-[300px]'>{collection.contractName}</h3>
              </div>
            ))
            } */}
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