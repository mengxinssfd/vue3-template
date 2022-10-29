import type User from './User';
import PrimaryRequest from '@/http/primary';

export interface Tag {
  createAt: string;
  description: string;
  id: number | string;
  name: string;
}
export interface Category {
  createAt?: string;
  description?: string;
  id: number | string;
  name: string;
  articleCount?: number;
}
export interface Article {
  author: User;
  bgm: string;
  category: Category;
  categoryId: number;
  content: string;
  cover: string;
  createAt: string;
  description: string;
  id: number;
  status: number;
  tags: Tag[];
  title: string;
  updateAt: string;
  viewCount: number;
  commentLock: boolean;
  commentCount?: number;

  like: { count: number; checked: number };
}

export interface GetArticleListRes {
  list: Article[];
  count: number;
}
export function getArticleList(data: {}) {
  return PrimaryRequest.Get<GetArticleListRes>('/api/article', data, { cache: true });
}
