import { paginateOptions } from "../../constants/config";

export const memberCardPayload = {
    create : {
        label : "",
        discount_id : "",
        expired_at : "",
        description : ""
    },
    update : {
        label : "",
        discount_id : "",
        expired_at : "",
        status : "",
        description : ""
    },
    columns: [
        { field: "label", header: "Label", sortable: true, show: true, width: 250 },
        { field: "expired_at", header: "Expired At", sortable: true, show: true, width: 250 },
        { field: "status", header: "Status", show: true, width: 100 },
        { field: "discount_id", header: "View Discount", sortable: true, show: true, width:  100 },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,expired_at",
        search: "",
        order: "id",
        sort: "DESC"
    },
    discountPaginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,discount_percentage,discount_fix_amount,expend_limit,start_date,end_date",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value: "ACTIVE"
    }
}