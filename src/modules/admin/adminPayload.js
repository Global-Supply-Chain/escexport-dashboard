import { paginateOptions } from "../../constants/config";
import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";

export const adminPayload = {
    create: {
        name: "",
        profile: "",
        email: "",
        phone: "",
        role_id: "",
        password: "",
        confirm_password: ""
    },
    update: {
        id : "",
        name: "",
        profile: "",
        email: "",
        phone: "",
        role_id: null,
        password: "",
        confirm_password :"",
        status: ""  
    },
    searchableFields: "id,name,email,phone",
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "phone", header: "Phone", sortable: true, show: true },
        { field: "status", header: "Status", show: true }
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,email,phone",
        search: "",
        order: "id",
        sort: "DESC",
        filter: "status",
        value: "",
        start_date: '',
        end_date: ''
    },
    status: async () => {
        const result = await getRequest(`${endpoints.status}?type=admin`);
        if(result.status === 200) {
            return result.data;
        }

        return [];
    }
}