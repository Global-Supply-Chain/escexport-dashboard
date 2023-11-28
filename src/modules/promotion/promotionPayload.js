import { paginateOptions } from "../../constants/config";


export const promotionPayload = {
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "title", header: "Title", sortable: true, show: true },
        { field: "image", header: "Image", sortable: true, show: true },
        { field: "url", header: "Url", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,title,image,url,status",
        search: "",
        order: "",
        sort: "DESC"
    }
}