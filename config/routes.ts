export const routes = {
  home: '/',
  cms: {
    productlist: '/products/product-list',
    categoryList: '/categories/category-list',
    categorySlug: (categorySlug: string) => `/categories/${categorySlug}`,
    categoryId: (categoryId: string) => `/categories/${categoryId}`,
    productSlug: (productSlug: string) => `/products/${productSlug}`,
    ecatalog: '/products/eCatalog',
    pricelist: '/products/pricelist',
    tkdn: '/products/tkdn',
    aboutcompany: '/about-company',
    directorsays: '/director',
    visimisi: '/visi-misi',
  },
};
