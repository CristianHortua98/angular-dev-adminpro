import { Hospital } from "./hospital.interface";

export interface ListDoctorsResponse{

    doctors: Hospital[];
    totalDoctors: number;

}