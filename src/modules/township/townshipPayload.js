import { paginateOptions } from "../../constants/config";

export const townshipPayload = {
    create: {
        name: "",
        city_id: ""
    },
    update: {
        name : "",
        status : "",
        city_id : ""
    },
    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "city", header: "City", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,city_id,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}