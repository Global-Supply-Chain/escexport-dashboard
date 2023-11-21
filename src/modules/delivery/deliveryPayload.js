import { paginateOptions } from "../../constants/config";

export const deliveryPayload = {
    update: {
        name: "",
        profile: "",
        email: "",
        phone: "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "contact_phone", header: "Contact Phone", sortable: true, show: true },
        { field: "contact_person", header: "Contact Person", sortable: true, show: true },
        { field: "is_default", header: "default Address", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,email.phone,status",
        search: "",
        order: "DESC",
        sort: "id"
    }
}