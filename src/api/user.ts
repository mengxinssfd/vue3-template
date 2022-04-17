// import { Post } from '@/http/ins/primary/instance';
import PrimaryRequest from '@/http/ins/primary';
const { post, get } = PrimaryRequest;
export default class User {
  username!: string;
  id!: number;
  static login(data: { username: string; password: string }) {
    // return Post('/login', data);
    return post<{ token: string }>('/user/login', data);
  }
  static getSelf() {
    return get<{ user: User }>('/user/self', {}, { silent: true });
  }
}
