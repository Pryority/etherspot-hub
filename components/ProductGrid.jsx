import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from '@heroicons/react/24/solid';

const ProductGrid = ({ props }) => {
  const { categories, showLink, loadMoreFun, hasMore } = props;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if (loadMoreFun) loadMoreFun();
    }
  }, [inView, loadMoreFun]);

  return (
    <div className="bg-black">
      {categories.map((category) => (
        <div className="  p-6" key={category.name}>
          <div className="flex flex-row justify-between">
            <span className="inline-flex items-center rounded-md bg-sky-800 px-8 py-2 text-md font-medium text-black">
              {category.name}
            </span>
            {showLink && (
              <Link href={`/category/${category.id}`}>
                <p className="flex flex-row gap-2 underline hover:cursor-pointer items-center">
                    View More
                  <ChevronRight />
                </p>
              </Link>
            )}
          </div>
          <div className="  grid grid-cols-1 bg-red-500 gap-y-10 gap-x-6 xl:gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {category?.products.map((product) => (
              <div
                className="p-6 group rounded-lg border border-gray-200 bg-neutral-200"
                key={product.title}
              >
                <div className="min-h-80 w-full overflow-hidden rounded-md group-hover:opacity-75 lg:aspect-none lg:h-80">
                  <Image
                    priority={true}
                    layout="fill"
                    src={`${product.image}`}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="relative ">
                  <h3 className="text-sm font-medium text-gray-900">
                    {product.title}
                  </h3>
                  <p className=" text-sm text-gray-500">
                    {product.price}
                  </p>
                </div>
                <div className="">
                  <Link
                    href={`/product/${product.title}`}
                  >
                    <p className="relative flex items-center justify-center rounded-md border border-transparent bg-sky-800 py-2 px-8 text-sm font-medium text-white hover:bg-sky-900 hover:cursor-pointer">
                        View More Details
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {!showLink && (
            <div className="flex items-center justify-center ">
              {hasMore ? (
                <button
                  ref={ref}
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-sky-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-900"
                >
                  Loading...
                </button>
              ) : (
                <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 w-full">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        You have viewed all the Products
                        under this category.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {showLink && (
            <div className="w-full border-b border-gray-300 " />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;