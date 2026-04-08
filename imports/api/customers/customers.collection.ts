import { Mongo } from "meteor/mongo";

export type CustomerListItem = {
    _id?: string;
    id: number;
    fullName: string;
    position: string;
};

export const CustomersCollection = new Mongo.Collection<CustomerListItem>("customers.list");