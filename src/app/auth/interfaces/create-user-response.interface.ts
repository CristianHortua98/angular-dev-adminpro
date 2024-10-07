import { User } from "../../models/user.model";

export interface CreateUserResponse {
    user:  User;
    token: string;
}