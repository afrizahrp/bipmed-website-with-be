import axios from 'axios';
import { Products } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetProductsProps {
  company_id: string;
  category_id: string;
}

const getProducts = async ({
  company_id,
  category_id,
}: GetProductsProps): Promise<Products[]> => {
  try {
    const URL = `${BASE_URL}/${company_id}/cms/products`;

    const response = await axios.get(URL, {
      params: {
        category_id,
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
