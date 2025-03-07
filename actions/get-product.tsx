import { Products } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products/BIP/slug/`;

interface Query {
  slug?: string;
  descriptions?: string;
}

const getProduct = async (query: Query): Promise<Products> => {
  let url = URL;

  if (query.slug?.trim()) {
    url = `${URL}${query.slug.trim()}`;
  } else {
    url = qs.stringifyUrl({
      url: URL,
      query: {
        descriptions: query.descriptions,
      },
    });
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Error fetching products: ${res.statusText}`);
      throw new Error(`Error fetching products: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', await res.text());
      throw new Error('Response is not JSON');
    }

    return await res.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export default getProduct;
