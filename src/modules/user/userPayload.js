import { paginateOptions } from "../../constants/config";

export const userPayload = {
    update: {
        id: "",
        name: "",
        profile: "",
        email: "",
        phone: "",
        dob: "",
        occupation: "",
        position: "",
        address: "",
        status: ""
    },
    store: {
        name: "",
        email: "",
        phone: "",
        dob: "",
        occupation: "",
        position: "",
        address: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "dob", header: "Birth Date", sortable: true, show: true },
        { field: "occupation", header: "Occupation", sortable: true, show: true },
        { field: "position", header: "Position", sortable: true, show: true },
        { field: "address", header: "Address", sortable: true, show: true },
        { field: "email_verified_at", header: "Email Verified", sortable: true, show: true },
        { filed: "phone_verfified_at", header: "Phone Verified", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,email,phone,occupation,position,dob,address,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}