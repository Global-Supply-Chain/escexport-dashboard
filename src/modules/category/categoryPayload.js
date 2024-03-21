import { paginateOptions } from "../../constants/config";

export const categoryPayload = {
  create: {
    name: "",
    icon: "",
    app_type: "",

  },
  update: {
    name: "",
    icon: "",
    app_type: "",
    description: "",
    status: "",
  },
  categoryColumns: [
    { field: "icon", header: "Icon", show: true, width: 100 },
    { field: "name", header: "Name", sortable: true, show: true, width: 200 },
    { field: "description", header: "Description", sortable: true, show: true, width: 200 },
    { field: "app_type", header: "App Type", sortable: true, show: true, width: 200 },
    { field: "status", header: "Status", sortable: true, show: true, width: 200 },
  ],
  categoryPaginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,name,app_type,description,status",
    search: "",
    order: "id",
    sort: "DESC",
    filter: "",
    value: ""
  }
};
