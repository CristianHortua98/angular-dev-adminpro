// import { User } from "../../models/user.model";

import { User } from "./models/user.interface";

export interface CreateUserResponse {
    user:  User;
    token: string;
}