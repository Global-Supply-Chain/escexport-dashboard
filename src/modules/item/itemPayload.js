import { paginateOptions } from "../../constants/config";


export const itemPayload = {
    create: {
        category_id: "",
        shop_id: "",
        name : "",
        images : [],
        code : "",
        description : "",
        content : "",
        price : "",
        sell_price : "",
        out_of_stock: false,
        instock: ""
    },
    update: {
        category_id: "",
        shop_id: "",
        name : "",
        images : [],
        code : "",
        description : "",
        content : "",
        price : "",
        sell_price : "",
        out_of_stock: false,
        instock: "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "category_name", header: "Category", sortable: true, show: true },
        { field: "code", header: "Code", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "content", header: "Content", show: true },
        { field: "price", header: "Price", show: true },
        { field: "sell_price", header: "Sell Price", show: true },
        { field: "out_of_stock", header: "Out of Stock", show: true },
        { field: "instock", header: "InStock", show: true },
        { field: "status", header: "Status", show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,name,category_id,code,instock,description,content,price,sell_price,out_of_stock,status",
        search: "",
        order: "id",
        sort: "DESC"
    }
}