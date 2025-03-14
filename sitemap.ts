import { MetadataRoute } from 'next';
import { Products, Categories } from '@/types';
import { apiUrl, publicUrl } from '@/env.mjs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  async function getProducts(): Promise<Products[]> {
    const URL = `${apiUrl}/products`;

    const data = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return data.result;
  }

  async function getCategories(): Promise<Categories[]> {
    const URL = `${apiUrl}/categories`;

    const data = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return data.result;
  }

  const products: Products[] = await getProducts();
  const categories: Categories[] = await getCategories();

  const productList = products.map((product) => ({
    url: `${publicUrl}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
  }));

  const categoryList = categories.map((category) => ({
    url: `${publicUrl}/categories/${category.slug}`,
    lastModified: new Date(category.updatedAt), // Assuming categories have an updatedAt field
  }));

  return [
    {
      url: `${publicUrl}/`,
      lastModified: new Date(),
    },
    ...productList,
    ...categoryList,
  ];
}
