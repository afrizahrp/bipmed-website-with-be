import axios from 'axios';
import { Products } from '@/types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface GetProductsProps {
  categoryId: string;
}

const companyId = 'BIP';
const getProducts = async ({
  categoryId,
}: GetProductsProps): Promise<Products[]> => {
  const URL = `${BASE_URL}/products/${companyId}/${categoryId}`;
  try {
    const response = await axios.get(URL);
    console.log('response', response.data);
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
