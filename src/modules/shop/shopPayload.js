import { paginateOptions } from "../../constants/config";

export const shopPayload = {
    create: {
        region_id: "",
        name: "",
        phone: "",
        address: "",
        location : ""
    },
    update: {
        region_id: "",
        name: "",
        phone: "",
        address: "",
        location : "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "region", header: "Region", sortable: true, show: true },
        { field: "name", header: "Shop Name", sortable: true, show: true },
        { field: "phone", header: "Shop Phone", sortable: true, show: true },
        { field: "address", header: "Shop Address", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,phone,address,location,status",
        search: "",
        order: "",
        sort: "DESC"
    }
}