import { Card } from "./card";
import { Country } from "shared/models/country";

export interface Trip {
    id: number;
    acountId: number;
    title: string;
    account: number;
    status: number;
    description: string;
    rating: number;
    cards: Card[];
    startDate: Date;
    endDate: Date;
    countries;
    sumRatings;
    sumVotes;
}