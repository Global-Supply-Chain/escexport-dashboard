import { paginateOptions } from "../../constants/config";

export const discountPayload = {
    create : {
        label : "",
        discount_percentage : "",
        discount_fix_amount : "",
        expend_limit : "",
        is_expend_limit : "",
        is_fix_amount : "",
        start_date : "",
        end_date : ""
    },
    update : {
        label : "",
        discount_percentage : "",
        discount_fix_amount : "",
        expend_limit : "",
        is_expend_limit : "",
        is_fix_amount : "",
        start_date : "",
        end_date : "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "label", header: "Label", sortable: true, show: true },
        { field: "discount_percentage", header: "Discount Percentage", sortable: true, show: true },
        { field: "discount_fix_amount", header: "Discount Fix Amount", sortable: true, show: true },
        { field: "expend_limit", header: "Expend Limit", sortable: true, show: true },
        { field: "is_expend_limit", header: "Is expend limit", sortable: true, show: true },
        { field: "is_fix_amount", header: "Is fix amount", sortable: true, show: true },
        { field: "start_date", header: "Start Date", sortable: true, show: true },
        { field: "end_date", header: "End Date", sortable: true, show: true },
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