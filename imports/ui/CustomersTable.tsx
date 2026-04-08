import React, { useRef } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import {
    CustomersCollection,
    type CustomerListItem,
} from "../api/customers/customers.collection";

import { usePositionMutationObserver } from "./hooks/usePositionMutationObserver";

export const CustomersTable = () => {
    const tableContainerRef = useRef<HTMLDivElement | null>(null);
    const { isLoading, customers } = useTracker(() => {
        const handle = Meteor.subscribe("customers.list");

        const customers = CustomersCollection.find(
            {},
            { sort: { id: 1 } }
        ).fetch() as CustomerListItem[];

        return {
            isLoading: !handle.ready(),
            customers,
        };
    });

    usePositionMutationObserver({
        containerRef: tableContainerRef,
        enabled: !isLoading && customers.length > 0,
    });

    if (isLoading) {
        return <div className="container py-4">Loading...</div>
    }

    return (
        <div className="container py-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h1 className="h4 mb-3">Customers</h1>

                    <div className="table-responsive" ref={tableContainerRef}>
                        <table className="table table-striped table-bordered align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Full name</th>
                                    <th>Position</th>
                                </tr>
                            </thead>

                            <tbody>
                                {customers.map((customer) => (
                                    <tr key={customer._id ?? customer.id}>
                                        <td>{customer.id}</td>
                                        <td>{customer.fullName}</td>
                                        <td className="__t" data-source-text={`${customer.position}`}>{customer.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};