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
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "city_name", header: "City", sortable: true, show: true },
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