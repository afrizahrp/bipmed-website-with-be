import { Metadata } from 'next';
import getProducts from '@/actions/get-products';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/app/(company)/products/_components/productCard';
import getCategory from '@/actions/get-category';
import { Categories } from '@/types';
import PageHeader from '@/components/ui/page-header';
import { routes } from '@/config/routes';

import './style.css';

export const revalidate = 0;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata | undefined> {
  const category: Categories = await getCategory({
    slug: params.slug.trim(),
  });
  if (!category) {
    return;
  }

  return {
    title: category.slug,
    description: category.name,
    openGraph: {
      title: category.slug,
      description: category.name,
      type: 'website',
      locale: 'id_ID',
      url: `https://bipmed.vercel.app/${params.slug}`,
      siteName: 'bipmed',
      images: [
        {
          url: category.imageURL,
        },
        // {
        //   url: urlForImage(post?.body?.find((b: any) => b._type === "image")).width(1200).height(630).url(),
        //   width: 1200,
        //   height: 630,
        // },
      ],
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  // const slug = params.slug.trim();

  const category = await getCategory({ slug: params.slug.trim() });

  const categoryName = category ? category.name : 'Default Category Name';
  const id = category ? category.id.trim() : 'default';
  const category_id = category ? category.id.trim() : 'default';

  const company_id = 'BIP';
  const products = await getProducts({ category_id });
  const productCategory = products.filter(
    (item) => item.category_id.trim() === id
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
    ],
  };

  const subHeaderText =
    productCategory.length > 0 ? (
      <div>
        <span className='desktop-caption'>
          Terdapat {productCategory.length} produk pada kategori{' '}
          <strong>{categoryName}</strong>
        </span>
        <span className='mobile-caption'>
          Ada {productCategory.length} produk pada kategori{' '}
          <strong>{categoryName}</strong>
        </span>
      </div>
    ) : (
      <>
        <div>
          <span className='desktop-caption'>
            Tidak ada produk pada kategori <strong>{categoryName}</strong>
          </span>
          <span className='mobile-caption'>
            Ada {productCategory.length} produk pada kategori{' '}
            <strong>{categoryName}</strong>
          </span>
        </div>
      </>
    );

  return (
    <div className='space-y-1'>
      <div className='mt-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 2xl:px-40'>
        <PageHeader
          title={pageHeader.title}
          breadcrumb={pageHeader.breadcrumb}
        />

        <h3 className='text-md sm:text-sm text-customBlue'>{subHeaderText}</h3>
        {productCategory.length === 0 && <NoResults />}
        <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-12'>
          {productCategory.map((item) => (
            <div key={item.id}>
              <ProductCard key={item.id} data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
