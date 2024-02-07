import { paginateOptions } from "../../constants/config";


export const memberOrderPayload = {
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "user_name", header: "User Name", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "order_number", header: "Order Number", sortable: true, show: true },
        { field: "pay_amount", header: "Pay Amount", sortable: true, show: true },
        { field: "amount", header: "Amount", sortable: true, show: true },
        { field: "card_number", header: "Card Number", sortable: true, show: true },
        { field: "card_type", header: "Card Type", sortable: true, show: true },
        { filed: "discount", header: "Discount", sortable: true, show : true },
        { filed: "is_wallet", header: "Wallet", sortable: true, show : true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,order_number,pay_amount,phone,amount,card_number,card_type,discount,email,is_wallet,member_id,user_id,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}