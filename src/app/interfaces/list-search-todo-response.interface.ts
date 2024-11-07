import { User } from "../auth/interfaces/models/user.interface";
import { Doctor } from "./doctor.interface";
import { Hospital } from "./hospital.interface";

export interface ListSearchTodoResponse{

    users: User[];
    hospitals: Hospital[];
    doctors: Doctor[];

}