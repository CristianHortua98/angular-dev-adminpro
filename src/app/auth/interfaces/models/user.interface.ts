export interface User{

    id: number;
    name: string;
    username: string;
    email: string;
    document: number;
    password?: string;
    img?: string;
    is_active?: number;
    role?: string;

}