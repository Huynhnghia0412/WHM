import React from "react";

const inputHelper = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    data: any
) => {
    const tempData: any = { ...data };
    if (e.target.name === "quantity") {
        tempData[e.target.name] = parseInt(e.target.value, 10);
    } else if (e.target.name === "noteDate" || e.target.name === "fromDate" || e.target.name === "toDate") {
        tempData[e.target.name] = new Date(e.target.value);
    }
    else {
        tempData[e.target.name] = e.target.value;
    }
    return tempData;
};

export default inputHelper;
