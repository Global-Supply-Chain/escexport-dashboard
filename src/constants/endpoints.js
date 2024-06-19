import { env } from "./config"

/** env[0] = Local | env[1] = Production */
export const baseURL = env[0];

export const endpoints = {
    login: "auth/login",
    admin: "admin",
    user: "user",
    promotion: "promotion",
    memberOrder: "member-order",
    memberDiscount: "member-discount",
    memberCard: "member-card",
    member: "member",
    category: "category",
    generalStatus: "general",
    paymentType: "payment_type",
    item: "item",
    image: `${baseURL}/storage/images`,
    status: "status",
    point: "point",
    delivery: "delivery-address",
    order: "order",
    faq: "faq",
    location: "location",
    country: "location/country",
    city: "location/city",
    township: "location/township",
    regionAndState: "location/region-and-state",
    region: "region",
    shop: "shop",
    count: "count",
    role: 'role',
    permission: 'permission',
    exportItem : 'export-item',
    importItem : 'import-item',
    importCategory : 'import-category',
    exportCategory : 'export-category',
    exportOrder : 'export-order',
    exportShop : 'export-shop',
    exportUser : 'export-user'
}