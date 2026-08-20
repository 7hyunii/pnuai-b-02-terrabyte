import { authenticatedRequest } from '../auth/authApi';

export type ShopCategory = 'parts' | 'soil' | 'seeds';

export type ShopProduct = {
  id: string;
  category: ShopCategory;
  name: string;
  emoji: string;
  desc: string;
  price: number;
  badge?: string;
};

export function getShopProducts() {
  return authenticatedRequest<ShopProduct[]>('/api/products');
}
