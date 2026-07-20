export interface Brand {
  _id: string;
  name: string;
  logo?: string;
}

export interface Seller {
  _id: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  region?: string;
}

export type PhoneCondition = "new" | "like_new" | "used";

export interface Phone {
  _id: string;
  title: string;
  brand?: Brand | string;
  model?: string;
  description?: string;
  price: number;
  currency?: "UZS" | "USD";
  isNegotiable?: boolean;
  condition: PhoneCondition;
  storage?: number;
  ram?: number;
  color?: string;
  batteryHealth?: number;
  images?: string[];
  region?: string;
  contactPhone?: string;
  seller?: Seller | string;
  status?: string;
  isFeatured?: boolean;
  views?: number;
  likesCount?: number;
  ratingAvg?: number;
  ratingCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  _id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  avatar?: string;
  phone?: string;
  role?: string;
  region?: string;
  city?: string;
  address?: string;
  gender?: string | null;
  birthDate?: string | null;
}

export interface CommentItem {
  _id: string;
  text: string;
  user?: { _id: string; firstName?: string; lastName?: string; avatar?: string };
  createdAt?: string;
}

export interface Meta {
  page: number;
  limit: number;
  total: number;
  pages?: number;
}

export interface Paginated<T> {
  items: T[];
  meta?: Meta;
}
