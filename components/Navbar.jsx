import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const menus = [
    { tabName: 'HOME', pageName: '/' },
    { tabName: 'LEARN', pageName: '/learn' },
    { tabName: 'MINT', pageName: '/mint' },
    { tabName: 'PROFILE', pageName: '/profile' },
  ];
  const pathname  = useRouter();
  return(
    <div className="relative p-3 w-full flex flex-col">
      <div className='grid grid-cols-2 md:grid-cols-4 w-full items-center justify-center p-4'>
        {menus.map((tab)=>(
          <Link href={tab.pageName} key={tab.tabName}>
            <div className={`flex justify-center items-center ${tab.tabName != 'PROFILE' && 'hover:bg-gradient-to-b hover:from-green-400 mx-8  hover:bg-[length:50%_2px] hover:bg-no-repeat hover:bg-bottom'}  ${tab.tabName === 'PROFILE' && 'bg-green-600 space-x-2 py-1 mx-8 items-center justify-center text-white border border-[#1e1e1e]/50 hover:bg-green-500 hover:scale-[1.024] transition ease-in-and-out duration-100 hover:text-green-900 rounded-md'} ${pathname === tab.pageName && tab.tabName != 'PROFILE' ? 'justify-center flex text-center bg-gradient-to-b from-black/80 bg-[length:50%_2px] bg-no-repeat bg-bottom' : 'justify-center flex text-center '}`}>
              <h2
                className={'font-semibold items-center cursor-pointer'}
              >
                {tab.tabName}
              </h2>
              <ShoppingCartIcon className={`${tab.tabName != 'PROFILE' && 'hidden'} h-6 w-6`}/>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;