import { paginateOptions } from "../../constants/config";


export const memberOrderPayload = {
    columns: [
        { field: "order_number", header: "Order Number", sortable: true, show: true, width: 200 },
        { field: "name", header: "Name", sortable: true, show: true, width: 250 },
        { field: "phone", header: "Phone", sortable: true, show: true, width: 150 },
        { field: "email", header: "Email", sortable: true, show: true, width: 250 },
        { field: "card_label", header: "Card Label", sortable: true, show: true, width: 250 },
        { field: "card_number", header: "Card Number", sortable: true, show: true, width: 180 },
        { field: "amount", header: "Amount", sortable: true, show: true, width: 180 },
        { field: "pay_amount", header: "Pay Amount", sortable: true, show: true, width: 180 },
        { field: "discount", header: "Discount", sortable: true, show : true, width: 180 },
        { field: "status", header: "Status", show: true, width: 200 }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,order_number,pay_amount,phone,amount,card_number,discount,email",
        search: "",
        order: "id",
        sort: "DESC"
    }
}