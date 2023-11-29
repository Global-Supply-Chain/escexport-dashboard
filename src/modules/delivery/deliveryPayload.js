import { paginateOptions } from "../../constants/config";

export const deliveryPayload = {
    create: {
        user_id: "",
        address: "",
        contact_phone: "",
        contact_person: "",
        is_default : ""
    },
    update: {
        user_id: "",
        address: "",
        contact_phone: "",
        contact_person: "",
        is_default : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "user_name", header: "User Name", sortable: true, show: true },
        { field: "address", header: "Address", sortable: true, show: true },
        { field: "contact_person", header: "Contact Person", sortable: true, show: true },
        { field: "contact_phone", header: "Contact Phone", sortable: true, show: true },
        { field: "is_default", header: "default Address", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,address,contact_phone,contact_person",
        search: "",
        order: "",
        sort: "DESC"
    }
}