'use client';
import ProductCard from '../_components/productCard';
import LayoutLoader from '@/components/ui/layout-loader';
import NoResults from '@/components/ui/no-results';
import PageHeader from '@/components/ui/page-header';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { useProducts } from '@/hooks/useProducts';
import { useSearchParams } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

const ProductListPage = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';

  const {
    data: products,
    isLoading,
    error,
  } = useProducts({
    search: name,
  });

  const productsFound = products?.length;
  const subHeaderText = productsFound ? (
    isMobile ? (
      <>
        Ada {productsFound} produk untuk {name && <strong>{name}</strong>}
      </>
    ) : (
      <>
        {productsFound} produk dengan kata pencarian{' '}
        {name && <strong>{name}</strong>} berhasil ditampilkan
      </>
    )
  ) : isMobile ? (
    <>{name && <strong>{name}</strong>} tidak ditemukan.</>
  ) : (
    <>
      Tidak ada produk dengan kata pencarian {name && <strong>{name}</strong>}.
    </>
  );

  const linkText = isMobile ? 'Daftar Kategori' : 'Kembali ke daftar kategori';

  if (isLoading)
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='flex-grow'>
          <LayoutLoader />
        </div>
      </div>
    );

  if (error || productsFound === 0)
    return (
      <div className='flex flex-col min-h-screen'>
        <div className='flex-grow flex flex-col items-center justify-center'>
          <div className='text-center'>
            {subHeaderText}
            <div className='mt-4'>
              <Link href={routes.cms.categoryList} className='text-customBlue'>
                {linkText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  const pageHeader = {
    title: 'Daftar Produk',
    breadcrumb: [
      {
        name: 'Beranda',
        href: routes.home,
      },
      {
        name: 'Daftar Kategori',
        href: routes.cms.categoryList,
      },
      {
        name: 'Hasil Pencarian Produk',
      },
    ],
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <div className='space-y-1'>
          <div className='mt-5 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-32 sm:px-6'>
            <div className='mt-1'>
              <PageHeader
                title={pageHeader.title}
                breadcrumb={pageHeader.breadcrumb}
              />
            </div>

            <div className='flex justify-between items-center mt-3'>
              <h3
                className={`text-customBlue ${isMobile ? 'text-sm' : 'text-sm'}`}
              >
                {subHeaderText}
                {productsFound === 0 && <NoResults />}
              </h3>
              {productsFound! > 0 && (
                <div className='flex justify-end items-right'>
                  <Link
                    href={routes.cms.categoryList}
                    className={`text-customBlue ${isMobile ? 'text-sm' : 'text-sm'}`}
                  >
                    {linkText}
                  </Link>
                </div>
              )}
            </div>
            <div className='mt-10 flex justify-center'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12'>
                {Array.isArray(products) &&
                  products.map((item) => (
                    <div key={item.id}>
                      <ProductCard key={item.slug} data={item} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
