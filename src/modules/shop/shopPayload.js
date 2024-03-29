import { paginateOptions } from "../../constants/config";

export const shopPayload = {
    create: {
        country_id: "",
        region_or_state_id: "",
        city_id: "",
        township_id: "",
        name: "",
        phone: "",
        email: "",
        description: "",
        address: "",
        app_type : "",
        location: "",
        shop_logo: "",
        cover_photo: ""
    },
    update: {
        country_id: "",
        region_or_state_id: "",
        city_id: "",
        township_id: "",
        name: "",
        phone: "",
        email: "",
        description: "",
        address: "",
        app_type : "",
        location: "",
        status : "",
        shop_logo: "",
        cover_photo: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true, show: true },
        { field: "country", header: "Country", sortable: true, show: true },
        { field: "region_or_state", header: "Region Or State", sortable: true, show: true },
        { field: "city", header: "City", sortable: true, show: true },
        { field: "township", header: "Township", sortable: true, show: true },
        { field: "shop_logo", header: "Shop Logo", sortable: true, show: true },
        { field: "cover_photo", header: "Cover Photo", sortable: true, show: true },
        { field: "name", header: "Shop Name", sortable: true, show: true },
        { field: "phone", header: "Shop Phone", sortable: true, show: true },
        { field: "email", header: "Email", sortable: true, show: true },
        { field: "app_type", header: "App Type", sortable: true, show: true },
        { field: "address", header: "Address", sortable: true, show: true },
        { field: "location", header: "Location", sortable: true, show: true },
        { field: "status", header: "Status", sortable: true, show: true },
    ],
    paginateParams: {
        page: 1,
        per_page: paginateOptions.rows,
        columns: "id,'country_id','region_or_state_id','city_id','township_id','name','phone','email','address','decription','location','app_type','status'",
        search: "",
        order: "",
        sort: "DESC"
    }
}