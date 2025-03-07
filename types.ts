export interface Products {
  id: string;
  catalog_id: string;
  name: string;
  images: ProductImages[];
  descriptions: ProductDescs[];
  category_id: string;
  category: Categories[];
  ecatalog_URL: string;
  tkdn_pctg: number;
  bmp_pctg: number;
  iShowedStatus: boolean;
  slug: string;
  updatedAt: Date;
}

export interface ProductsResponse {
  products: Products[];
}

export interface ProductImages {
  id: string;
  isPrimary: boolean;
  imageURL: string;
}
export interface Categories {
  id: string;
  name: string;
  // images: CategoryImages[];
  imageURL: string;
  iShowedStatus: boolean;
  href: string;
  slug: string;
  updatedAt: Date;
}

export interface CategoryImages {
  id: string;
  name: string;
  imageURL: string;
}

export interface ProductDescs {
  id: string;
  descriptions: string;
  benefit: string;
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
