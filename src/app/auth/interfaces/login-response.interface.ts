// import { User } from "../../models/user.model";

import { User } from "./models/user.interface";

export interface LoginResponse{

    user: User;
    token: string;

}