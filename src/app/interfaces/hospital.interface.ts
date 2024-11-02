import { User } from "../auth/interfaces/models/user.interface";

export interface Hospital{

    id?: number;
    img?: string;
    name: string;
    user?: User

}