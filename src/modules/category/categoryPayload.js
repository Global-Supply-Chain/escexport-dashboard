import { paginateOptions } from "../../constants/config";


export const categoryPayload = {
    create: {
        title : "",
        level : "",
        category_id: "",
        description : ""
    },
    update: {
        title : "",
        level : "",
        category_id : "",
        description : "",
        status: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "title", header: "Title", sortable: true, show: true },
        { field: "level", header: "Level", sortable: true, show: true },
        { field: "category_name", header: "Category", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,title,level.category_id,description,status",
        search: "",
        order: "DESC",
        sort: "id"
    }
}