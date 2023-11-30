import { paginateOptions } from "../../constants/config";

export const regionPayload = {
    create: {
        name: "",
    },
    update: {
        name : "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}