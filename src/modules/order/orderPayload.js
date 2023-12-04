import { paginateOptions } from "../../constants/config";


export const orderPayload = {
    update: {
        delivery_address_id : '',
        user_id : '',
        user_name : '',
        phone : '',
        email : '',
        delivery_address : '',
        delivery_contact_person : '',
        delivery_contact_phone : '',
        discount : '',
        delivery_feed : '',
        total_amount : '',
        items : '',
        payment_type : '',
        status : ''
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "user_name", header: "User Name", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "delivery_address", header: "Delivery Address", sortable: true, show: true },
        { field: "delivery_contact_person", header: "Delivery Contact Person", sortable: true, show: true },
        { field: "delivery_contact_phone", header: "Delivery Contact Phone", sortable: true, show: true },
        { field: "discount", header: "Discount", sortable: true, show: true },
        { field: "delivery_feed", header: "Delivery Feed", sortable: true, show: true },
        { filed: "total_amount", header: "Total Amount", sortable: true, show : true },
        { filed: "items", header: "Item", sortable: true, show : true },
        { filed: "payment_type", header: "Payment Type", sortable: true, show : true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,user_name,email,phone,discount,delivery_feed,total_amount,payment_type,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}