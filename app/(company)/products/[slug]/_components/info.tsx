import { Products } from '@/types';
import Link from 'next/link';
import SpectoDownload from './specdownload';
import './style.css';

interface InfoProps {
  product: Products; // Assuming data is of type Products
}

const Info: React.FC<InfoProps> = ({ product }) => {
  if (!product) {
    return <div>Product doesn&apos;t exist...</div>;
  }

  const nonPrimaryImages = product.images.filter(
    (image) => image.isPrimary === false
  );
  const nonPrimaryImage =
    nonPrimaryImages.length > 0 ? nonPrimaryImages[0] : null;

  return (
    <>
      <div className='text-1xl text-gray-900 text-left justify-center'>
        Katalog : {product.catalog_id}
        <h1 className='text-2xl text-left font-semibold text-gray-600 mb-3'>
          {product.name.trim()}
        </h1>
        {nonPrimaryImage && (
          <SpectoDownload
            fileUrl={nonPrimaryImage.imageURL}
            filename={`${product.catalog_id.trim()}_bipmed.jpg`}
            title='Download Spesifikasi Produk'
          />
        )}
      </div>

      <div className='mt-5'>
        {product.eCatalogURL ? (
          <>
            <Link
              href={product.eCatalogURL}
              className='text-customBlue font-semibold desktop-caption'
              target='_blank'
              rel='noopener noreferrer'
            >
              Lihat produk ini di e-Catalogue.lkpp
            </Link>
            <Link
              href={product.eCatalogURL}
              className='text-customBlue font-semibold mobile-caption'
              target='_blank'
              rel='noopener noreferrer'
            >
              Lihat di e-Catalogue.lkpp
            </Link>
          </>
        ) : null}
      </div>
      {product.descriptions && (
        <div>
          <h2 className='text-lg font-semibold mb-5 underline mt-10'>
            Deskripsi dan Fitur
          </h2>
          <div
            className={'text-sm'}
            dangerouslySetInnerHTML={{
              __html: product.descriptions.descriptions,
            }}
          />
          <h2 className='text-lg font-semibold mb-5 underline mt-10'>
            Manfaat
          </h2>
          <div
            className={'text-sm'}
            dangerouslySetInnerHTML={{
              __html: product.descriptions.benefits,
            }}
          />
        </div>
      )}
    </>
  );
};

export default Info;
