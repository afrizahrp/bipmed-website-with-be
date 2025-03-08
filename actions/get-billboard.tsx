import axios from 'axios';
import { Billboards } from '@/types';

// const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

const getBillboard = async (): Promise<Billboards[]> => {
  try {
    const URL = `${BASE_URL}/billboards`;
    const response = await axios.get(URL);
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
export default getBillboard;
