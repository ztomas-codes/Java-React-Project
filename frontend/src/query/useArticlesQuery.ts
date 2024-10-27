import { fetchData } from '@/features/fetchData';
import { useQuery } from '@tanstack/react-query';

export const useArticlesQuery = () =>
  useQuery({
    queryKey: ['accountInfo'],
    staleTime: Infinity,
    refetchInterval: 10000,
    queryFn: async () =>  await fetchData<Article[]>("http://localhost:8080/blogs"),
    enabled: true,
  });


export type User = {
    username: string;
}

export type Article = {
    title: string;
    content: string;
    user: User;
    category: string;
    date: string;
    image: string;
    visibility: boolean;
    slug: string;
}
