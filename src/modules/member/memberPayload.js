import { paginateOptions } from "../../constants/config";

export const memberPayload = {
    create : {
        user_id : "",
        membercard_id : "",
        member_id : "",
        amount : "",
        expired_at : "",
    },
    update : {
        user_id : "",
        membercard_id : "",
        member_id : "",
        amount : "",
        expired_at : "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "user_name", header: "User", sortable: true, show: true },
        { field: "membercard_id", header: "Member Card", sortable: true, show: true },
        { field: "member_id", header: "Member ID", sortable: true, show: true },
        { field: "amount", header: "Amount", sortable: true, show: true },
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