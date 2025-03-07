import axios from 'axios';
import { Products } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface GetProductsProps {
  iShowedStatus: boolean;
  categoryId: string;
}

const getProducts = async ({
  iShowedStatus,
  categoryId,
}: GetProductsProps): Promise<Products[]> => {
  try {
    const response = await axios.get(URL, {
      params: {
        iShowedStatus,
        category_id: categoryId,
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
