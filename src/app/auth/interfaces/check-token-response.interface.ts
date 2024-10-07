import { User } from '../../models/user.model';

export interface CheckTokenResponse{

    user: User;
    token: string;

}