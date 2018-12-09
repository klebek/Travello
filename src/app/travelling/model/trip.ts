import { Card } from "./card";

export interface Trip {
    acountId: number;
    title: string;
    account: number;
    status: number;
    description: string;
    rating: number;
    cards: Card[];
    startDate: Date;
    endDate: Date;
}