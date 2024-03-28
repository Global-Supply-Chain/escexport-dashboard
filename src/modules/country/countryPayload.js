import { paginateOptions } from "../../constants/config";

export const countryPayload = {
    create: {
        name: "",
        country_code: "",
        flag_image: "",
        mobile_prefix: "",
    },
    update: {
        name: "",
        country_code: "",
        flag_image: "",
        mobile_prefix: "",
        status: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "flag_image", header: "Flag", sortable: true, show: true },
        { field: "mobile_prefix", header: "Mobile Prefix", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,country_code,mobile_prefix,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}