import { User } from "../auth/interfaces/models/user.interface";
import { Hospital } from "./hospital.interface";

export interface Doctor{

    id?: number;
    name: string;
    img?: string;
    user?: User;
    hospital?: Hospital;

}