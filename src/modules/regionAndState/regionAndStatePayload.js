import { paginateOptions } from "../../constants/config";

export const regionAndStatePayload = {
    create: {
        name: "",
        country_id: ""
    },
    update: {
        name : "",
        status : "",
        country_id : ""
    },
    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "country_name", header: "Country", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,country_id,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}