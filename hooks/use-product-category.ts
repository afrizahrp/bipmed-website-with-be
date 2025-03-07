import { useQuery } from '@tanstack/react-query';
import getProductCategory from '@/actions/get-product-category';
import { Products } from '@/types';

interface useProductCategoryProps {
  category_id: string;
}

export const useProductCategory = ({
  category_id,
}: useProductCategoryProps) => {
  const { data, isLoading, error, ...rest } = useQuery<Products[], Error>({
    queryKey: ['products', category_id],
    queryFn: async () => {
      try {
        const products = await getProductCategory({
          categoryId: category_id,
        });
        return products; // Ensure this returns an array of Products
      } catch (err) {
        throw new Error('Failed to fetch products');
      }
    },
    retry: 3,
    staleTime: 60 * 60 * 1000, // 1 hour
    enabled: category_id !== '', // Only run the query if category_id is not empty
  });

  return { data, isLoading, error, ...rest };
};
