import { Trip } from "app/travelling/model/trip";

export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    description: string;
    trips: Trip[];
    business: boolean;
    photo: string;
    admin: boolean;
}