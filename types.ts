export interface ProductDesc {
  descriptions: string;
  benefits: string;
}

export interface ProductImages {
  id: string;
  isPrimary: boolean;
  imageURL: string;
}

export interface Categories {
  id: string;
  name: string;
  imageURL: string;
  iShowedStatus: boolean;
  href: string;
  slug: string;
  updatedAt: Date;
}

export interface Products {
  id: string;
  register_id: string;
  catalog_id: string;
  eCatalogURL: string;
  name: string;
  slug?: string;
  category_id: string;
  category: Categories;
  images: ProductImages[];
  updatedAt: Date;
  descriptions: ProductDesc; // Update this line to reflect the correct type
  primaryImageURL: string;
}

export interface ProductsResponse {
  products: Products[];
}

export interface PriceList {
  id: string;
  name: string;
  fileURL: string;
  iShowedStatus: boolean;
}

export interface Billboards {
  section: number;
  id: string;
  title: string;
  isImage: boolean;
  contentURL: string;
  iShowedStatus: boolean;
}

export interface BillboardContents {
  tile: string;
  contentURL: string;
}

export interface Size {
  id: string;
  name: string;
  value: string;
}

export interface Color {
  id: string;
  name: string;
  value: string;
}
