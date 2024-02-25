import moment from "moment";
import { paginateOptions } from "../../constants/config";

export const userPayload = {
    update: {
        id: "",
        name: "",
        gender: "MALE",
        email: "",
        phone: "",
        occupation: "",
        position: "",
        address: "",
        status: ""
    },
    store: {
        name: "",
        email: "",
        phone: "",
        gender: "MALE",
        dob: moment().format("YYYY/MM/DD"),
        occupation: "",
        position: "",
        address: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "gender", header: "Gender", sortable: true, show: true },
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
        columns: "id,name,email,phone,gender,occupation,position,dob,address,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}