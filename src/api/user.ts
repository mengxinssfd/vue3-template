import { Post } from '@/http/ins/main-domain/instance';

export function login(data: { username: string; password: string }) {
  return Post('/login', data);
}
