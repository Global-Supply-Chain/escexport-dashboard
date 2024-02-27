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
        { field: "label", header: "Label", sortable: true, show: true, with: 300 },
        { field: "discount_percentage", header: "Percent", sortable: true, show: true, with: 100 },
        { field: "discount_fix_amount", header: "Fix Amount", sortable: true, show: true, with: 200 },
        { field: "expend_limit", header: "Limit", sortable: true, show: true, with: 200 },
        { field: "is_expend_limit", header: "Is Limit", sortable: true, show: true, with: 150 },
        { field: "is_fix_amount", header: "Is Fix Amount", sortable: true, show: true, with: 200 },
        { field: "start_date", header: "Start Date", sortable: true, show: true, with: 250 },
        { field: "end_date", header: "End Date", sortable: true, show: true, with: 250 },
        { field: "status", header: "Status", show: true, with: 100 }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,discount_percentage,discount_fix_amount,expend_limit,start_date,end_date",
        search: "",
        order: "id",
        sort: "DESC"
    }
}