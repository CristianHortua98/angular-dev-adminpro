import { environments } from "../../environments/environments";

const baseUrl = environments.baseUrl;

export class User{

    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public document: number;
    public password?: string;
    public img?: string;
    public is_active?: number;
    public role?: string;

    constructor(
        id: number,
        name: string,
        username: string,
        email: string,
        document: number,
        password?: string,
        img?: string,
        is_active?: number, 
        role?: string
    ){

        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.document = document;
        this.password = password;
        this.img = img;
        this.is_active = is_active;
        this.role = role;

    }

}
