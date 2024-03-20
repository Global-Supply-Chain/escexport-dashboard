import { paginateOptions } from "../../constants/config";


export const promotionPayload = {
    create : {
        title: "",
        image: "",
        app_type: "",
        start_date: "",
        end_date: ""
    },
    update : {
        title: "",
        image: "",
        app_type: "",
        start_date: "",
        end_date: "",
        status : ""
    },
    columns: [
        { field: "title", header: "Title", sortable: true, show: true, with: 100 },
        { field: "image", header: "Image", sortable: true, show: true, with: 100 },
        { field: "app_type", header: "App Type", sortable: true, show: true, with: 100 },
        { field: "start_date", header: "Start Date", sortable: true, show: true, with: 100 },
        { field: "end_date", header: "End Date", sortable: true, show: true, with: 100 },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,title,app_type,start_date,end_date",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value : "ACTIVE",
        start_date: "",
        end_date: ""
    }
}