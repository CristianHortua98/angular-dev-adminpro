import { User } from "./models/user.interface";

export interface UserListResponse{

    totalUser: number;
    users: User[];

}