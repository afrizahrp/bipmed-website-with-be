import axios from 'axios';
import { Billboards } from '@/types';

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async ({
  iShowedStatus,
}: {
  iShowedStatus: boolean;
}): Promise<Billboards[]> => {
  try {
    const response = await axios.get(URL, {
      params: {
        iShowedStatus,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error((error as any).message);
  }
};
export default getBillboard;
