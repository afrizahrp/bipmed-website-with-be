import axios from 'axios';
import { Products } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface GetProductsProps {
  company_id: string;
  search: string;
}

const getProducts = async ({
  company_id,
  search,
}: GetProductsProps): Promise<Products[]> => {
  try {
    const response = await axios.get(URL, {
      params: {
        company_id: 'BIP',
        name: search,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

export default getProducts;
