// import { User } from '../../models/user.model';

import { User } from "./models/user.interface";

export interface CheckTokenResponse{

    user: User;
    token: string;

}