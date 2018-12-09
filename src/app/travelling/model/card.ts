import { Trip } from "./trip";

export interface Card {
    id: number;
    trip: Trip;
    title: string;
    description: string;
    date: Date;
    photo: string;
}