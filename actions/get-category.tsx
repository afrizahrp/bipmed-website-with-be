import { Categories } from '@/types';
import qs from 'query-string';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories/`;

interface Query {
  slug?: string;
}

const getCategory = async (query: Query): Promise<Categories> => {
  let url = URL;

  if (query.slug) {
    url = `${URL}${query.slug}`;
  } else {
    url = qs.stringifyUrl({
      url: URL,
      query: {},
    });
  }

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error(`Error fetching category: ${res.statusText}`);
      throw new Error(`Error fetching category: ${res.statusText}`);
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

export default getCategory;
