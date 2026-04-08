import { Meteor } from "meteor/meteor";

export const subscribeCustomersList = () => {
    return Meteor.subscribe("customers.list");
};