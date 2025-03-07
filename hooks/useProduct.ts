import getProduct from '@/actions/get-product';
import { useQuery } from '@tanstack/react-query';
import { Products } from '@/types';

export const useProduct = (slug: string) => {
  const { data, isLoading, error, ...rest } = useQuery<Products[], Error>({
    queryKey: ['products'],
    queryFn: async () => [await getProduct({ slug })],
    staleTime: 60 * 1000, // 60s
  });

  return { data, isLoading, error, ...rest };
};
