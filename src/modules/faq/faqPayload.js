import { paginateOptions } from "../../constants/config";

export const faqPayload = {
    create: {
        faq : {
            answer: {
                mm : "",
                uk : "",
                cn : ""
            },
            question: {
                mm : "",
                uk : "",
                cn : ""
            },
        }
    },
    update: {
        faq : {
            answer: {
                mm : "",
                uk : "",
                cn : ""
            },
            question: {
                mm : "",
                uk : "",
                cn : ""
            },
        }
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "question", header: "Question", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,answer,question,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}