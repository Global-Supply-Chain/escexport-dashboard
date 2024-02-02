import { paginateOptions } from "../../constants/config";

export const memberCardPayload = {
    create : {
        label : "",
        discount_id : "",
        front_background : "",
        back_background : "",
        expired_at : "",
    },
    update : {
        label : "",
        discount_id : "",
        front_background : "",
        back_background : "",
        expired_at : "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "label", header: "Label", sortable: true, show: true },
        { field: "discount_name", header: "Discount Name", sortable: true, show: true },
        { field: "front_background", header: "Front Background", sortable: true, show: true },
        { field: "back_background", header: "Back Background", sortable: true, show: true },
        { field: "expired_at", header: "Expired At", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,discount_percentage,discount_fix_amount,expend_limit,is_expend_limit,is_fix_amount,start_date,end_date,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}