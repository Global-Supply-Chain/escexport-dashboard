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
        profile: "",
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
        { field: "name", header: "Full Name", sortable: true, show: true, with: "250px" },
        { field: "gender", header: "Gender", sortable: true, show: true, with: "50px" },
        { field: "email", header: "Email", sortable: true, show: true, with: "250px" },
        { field: "phone", header: "Phone", sortable: true, show: true, with: "250px" },
        { field: "dob", header: "Birth Date", sortable: true, show: true, with: "150px" },
        { field: "age", header: "Age", sortable: false, show: true, with: "100px" },
        { field: "occupation", header: "Occupation", sortable: true, show: true, with: "250px" },
        { field: "position", header: "Position", sortable: true, show: true, with: "250px" },
        { field: "address", header: "Address", sortable: true, show: true, with: "350px" },
        { field: "email_verified_at", header: "Email Verified", sortable: true, show: true, with: "250px" },
        { filed: "phone_verfified_at", header: "Phone Verified", sortable: true, show: true, with: "250px" },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,email,phone,occupation,position,dob,address",
        search: "",
        order: "id",
        sort: "DESC"
    },
}