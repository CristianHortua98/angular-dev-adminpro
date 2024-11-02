import { Hospital } from "./hospital.interface";

export interface ListHospitalsResponse{

    hospitals: Hospital[];
    totalHospitals: number;

}