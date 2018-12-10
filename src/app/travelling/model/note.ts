import { Trip } from "./trip";

export interface Note {
    id: number;
    trip: Trip;
    title: string;
    description: string;
    date: Date;
    photo: string;
    caption: string;
    type: number;
}