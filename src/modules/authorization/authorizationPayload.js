import { paginateOptions } from "../../constants/config";


export const authorizationPayload = {
    createRole: {
        name : '',
        description : ''
    },
    updateRole: {
        
    },
    roleColumns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "description", header: 'Description', sortable: true, show: true }
    ],
    permissionColumns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Name", sortable: true, show: true },
        { field: 'description', header: "Description", sortable: true, show: true }
    ],
    permissionPaginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,description",
        search: "",
        order: "id",
        sort: "DESC"
    },
    rolePaginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,description",
        search: "",
        order: "id",
        sort: "DESC"
    }
}