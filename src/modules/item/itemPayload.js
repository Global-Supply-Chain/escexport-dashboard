import { paginateOptions } from "../../constants/config";


export const itemPayload = {
    create: {
        category_id: "",
        shop_id: "",
        name : "",
        thumbnail_photo : "",
        product_photo : [],
        item_code : "",
        item_color : [],
        item_size : [],
        description : "",
        content : "",
        price : "",
        sell_price : "",
        instock: ""
    },
    update: {
        category_id: "",
        shop_id: "",
        name : "",
        thumbnail_photo : "",
        product_photo : [],
        item_code : "",
        item_color : [],
        item_size : [],
        description : "",
        content : "",
        price : "",
        sell_price : "",
        instock: "",
        status : ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "name", header: "Full Name", sortable: true, show: true },
        { field: "category_name", header: "Category", sortable: true, show: true },
        { field: "shop_name", header: "Shop", sortable: true, show: true },
        { field: "thumbnail_photo", header: "Thumbnail", sortable: true, show: true },
        { field: "product_photo", header: "Product", sortable: true, show: true },
        { field: "item_code", header: "Code", sortable: true, show: true },
        { field: "item_color", header: "Color", sortable: true, show: true },
        { field: "item_size", header: "Size", sortable: true, show: true },
        { field: "description", header: "Description", sortable: true, show: true },
        { field: "content", header: "Content", show: true },
        { field: "price", header: "Price", show: true },
        { field: "sell_price", header: "Sell Price", show: true },
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