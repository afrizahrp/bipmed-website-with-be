import { useQuery } from '@tanstack/react-query';
import getProductCategory from '@/actions/get-product-category';
import { Products } from '@/types';

export const useProductCategory = (category_Id: string) => {
  const { data, isLoading, error, ...rest } = useQuery<Products[], Error>({
    queryKey: ['products', category_Id],
    queryFn: async () => {
      try {
        const products = await getProductCategory({
          iShowedStatus: true,
          categoryId: category_Id,
        });
        return products; // Ensure this returns an array of Products
      } catch (err) {
        throw new Error('Failed to fetch products');
      }
    },
    retry: 3,
    staleTime: 60 * 60 * 1000, // 1 hour
    enabled: category_Id.trim() !== '', // Only run the query if category_id is not empty
  });

  return { data, isLoading, error, ...rest };
};
