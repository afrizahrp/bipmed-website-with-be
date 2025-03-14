import { Products } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface getProductsByNameProps {
  search: string;
}

const getProductsByName = async ({
  search,
}: getProductsByNameProps): Promise<Products[]> => {
  try {
    const URL = `${BASE_URL}/products/search/${search}`;

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      throw new Error(`Produk dengan nama "${search}" tidak ditemukan`);
    }

    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    if (error instanceof Error) {
      throw new Error(error.message || 'An unexpected error occurred');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

export default getProductsByName;
