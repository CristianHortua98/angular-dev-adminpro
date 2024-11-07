// import { User } from "../../models/user.model";

import { MenuItem } from "./menu-item.interface";
import { User } from "./models/user.interface";

export interface CreateUserResponse {
    user:  User;
    token: string;
    menu: MenuItem[];
}