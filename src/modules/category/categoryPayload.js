import { paginateOptions } from "../../constants/config";

export const categoryPayload = {
  create: {
    title: "",
    level: "",
    category_id: "",
    description: "",
    icon: "",
  },
  createMain: {
    title: "",
    level: "",
    description: "",
    icon: "",
  },
  update: {
    title: "",
    level: "",
    category_id: "",
    description: "",
    icon: "",
    status: "",
  },
  columns: [
    { field: "id", header: "ID", sortable: true, show: true },
    { field: "title", header: "Title", sortable: true, show: true },
    { field: "level", header: "Level", sortable: true, show: true },
    { field: "category_name", header: "Category", sortable: true, show: true },
    { field: "status", header: "Status", sortable: true, show: true },
  ],
  mainCategoryColumns: [
    { field: "id", header: "ID", sortable: true, show: true },
    { field: "icon", header: "Icon", show: true },
    { field: "title", header: "Title", sortable: true, show: true },
    { field: "status", header: "Status", sortable: true, show: true },
  ],
  paginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,title,level.category_id,description,status",
    search: "",
    order: "id",
    sort: "DESC",
  },
  mainCategoryPaginateParams: {
    page: 1,
    per_page: paginateOptions.rows,
    columns: "id,title,status",
    search: "",
    order: "id",
    sort: "DESC",
    filter: "level-0",
  },
};
