import { paginateOptions } from "../../constants/config";

export const faqPayload = {
    create: {
        answer: "",
        question: "",
    },
    update: {
        answer: "",
        question: "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "answer", header: "Answer", sortable: true, show: true },
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