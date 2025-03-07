import getProducts from '@/actions/get-products';
import { Products } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';

interface UseProductsProps {
  company_id: string;
  category_id: string;
  search: string;
}

export const useProducts = ({
  company_id,
  category_id,
  search,
}: UseProductsProps) => {
  const [debouncedSearch] = useDebounce(search, 1000); // 500ms debounce

  const { data, isLoading, error, ...rest } = useQuery<Products[], Error>({
    queryKey: ['products', debouncedSearch],
    queryFn: async () => {
      try {
        return await getProducts({
          company_id,
          category_id,
          search: debouncedSearch,
        });
      } catch (err) {
        throw new Error('Failed to fetch products');
      }
    },
    retry: 3,
    staleTime: 60 * 60 * 1000, // 60s
    enabled: debouncedSearch !== '', // Only run the query if debouncedSearch is not empty
  });

  return { data, isLoading, error, ...rest };
};
