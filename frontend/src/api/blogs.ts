import { useQuery } from '@tanstack/react-query';

export interface Blog {
  id: number;
  title: string;
  author: string;
  date: string;
  image: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const response = await fetch('http://localhost:8080/blogs');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useBlogList = () => {
  return useQuery<Blog[], Error>({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
  });
};
