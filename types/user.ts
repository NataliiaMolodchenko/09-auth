export interface User{
    data: User | PromiseLike<User>;
    email: string;
    username: string;
    avatar: string;
}