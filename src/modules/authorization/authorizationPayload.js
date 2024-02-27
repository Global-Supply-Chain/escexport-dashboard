import { paginateOptions } from "../../constants/config";


export const authorizationPayload = {
    createRole: {
        name : '',
        is_merchant : "",
        description : '',
    },
    updateRole: {
        name : '',
        description : '',
        is_merchant : '',
        permissions : []
    },
    roleColumns: [
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "description", header: 'Description', sortable: true, show: true }
    ],
    roleHasPermissionColumns : [
        { field: "name", header: "Name", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "action", header: "Action", sortable: false, show: true },
    ],
    permissionColumns: [
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