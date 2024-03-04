import { paginateOptions } from "../../constants/config";

export const memberPayload = {
    create : {
        user_id : "",
        membercard_id : "",
        member_id : "",
        amount : "",
        expired_at : "",
        description : ""
    },
    update : {
        user_id : "",
        membercard_id : "",
        member_id : "",
        amount : "",
        expired_at : "",
        status : "",
        description : ''
    },
    columns: [
        { field: "user_name", header: "User", sortable: true, show: true, width: 250 },
        { field: "membercard_name", header: "Member Card", sortable: true, show: true, width: 250  },
        { field: "member_id", header: "Member ID", sortable: true, show: true, width: 250 },
        { field: "amount", header: "Amount", sortable: true, show: true, width: 250 },
        { field: "expired_at", header: "Expired At", sortable: true, show: true, width: 250 },
        { field: "status", header: "Status", show: true, width: 100 }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,discount_percentage,discount_fix_amount,expend_limit,is_expend_limit,is_fix_amount,start_date,end_date,status",
        search: "",
        order: "id",
        sort: "DESC"
    },
    userPaginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,email,phone,gender,occupation,position,dob,address",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value : "ACTIVE"
    },
    memberCardPaginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,label,expired_at",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value : "ACTIVE"
    }
}