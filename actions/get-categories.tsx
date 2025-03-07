import { Categories } from '@/types';
import qs from 'query-string';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getCategories = async (): Promise<Categories[]> => {
  const query = {};

  const url = qs.stringifyUrl({
    url: `${BASE_URL}/categories`,
    query,
  });

  const res = await fetch(url, {
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    console.error(`Error fetching categories: ${res.statusText}`);
    throw new Error(`Error fetching categories: ${res.statusText}`);
  }

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    console.error('Response is not JSON:', await res.text());
    throw new Error('Response is not JSON');
  }

  const data = await res.json();
  return data.data;
};

export default getCategories;
