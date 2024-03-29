import { paginateOptions } from "../../constants/config";

export const cityPayload = {
    create: {
        name: "",
        region_or_state_id: ""
    },
    update: {
        name : "",
        status : "",
        region_or_state_id : ""
    },
    columns: [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "region_or_state", header: "Region Or State", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,region_or_state_id,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}