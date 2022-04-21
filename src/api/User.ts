// import { Post } from '@/http/ins/primary/instance';
import PrimaryRequest from '@/http/primary';
const { post, get } = PrimaryRequest;
export default class User {
  username!: string;
  id!: number;
  static login(data: { username: string; password: string }) {
    // return Post('/login', data);
    return post<{ token: string }>('/user/login', data);
  }
  static getSelf() {
    const req = get<{ user: User }>('/user/self', {}, { silent: true });
    const cancel = PrimaryRequest.ins.cancelCurrentRequest;
    setTimeout(() => cancel('cancel test'));
    return req;
  }
}
