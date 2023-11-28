import { paginateOptions } from "../../constants/config";


export const pointPayload = {
    create: {
        label : "",
        point : "",
    },
    update: {
        label : "",
        point : "",
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "label", header: "Label", sortable: true, show: true },
        { field: "point", header: "Point", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,point",
        search: "",
        order: "",
        sort: "DESC"
    }
}