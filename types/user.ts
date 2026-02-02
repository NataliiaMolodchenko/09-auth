export interface User{
    headers?: Record<string, string>;
    data: User | PromiseLike<User>;
    email: string;
    username: string;
    avatar: string;
}