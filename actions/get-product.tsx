import { Products } from '@/types';
import qs from 'query-string';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

interface Query {
  slug?: string;
  // descriptions?: string;
}

const getProduct = async (query: Query): Promise<Products> => {
  let url = `${BASE_URL}/products`;

  if (query.slug?.trim()) {
    url = `${url}/${query.slug.trim()}`;
  } else {
    url = qs.stringifyUrl({
      url,
      // query: {
      //   descriptions: query.descriptions,
      // },
    });
  }
  console.log('Fetching product with URL:', url);

  try {
    const res = await fetch(url);
    console.log('response', res);

    if (!res.ok) {
      console.error(`Error fetching product: ${res.statusText}`);
      throw new Error(`Error fetching product: ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON:', await res.text());
      throw new Error('Response is not JSON');
    }

    const data = await res.json();
    return data[0]; // Assuming the API returns an array with one product
  } catch (error) {
    console.error('Failed to fetch product:', error);
    throw error;
  }
};

export default getProduct;
