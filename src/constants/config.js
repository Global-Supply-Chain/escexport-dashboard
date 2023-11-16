export const paginateOptions = {
    page: 1,
    per_page: 10,
    search: "",
    order: "id",
    sort: "DESC"
}

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER"
}

/**
 * Notification Options
 * serverity ["error" | "success" | "info" | "warn"]
 * sticky [boolean | default -> true ]
 */
export const notificationOptions = {
    severity: "info",
    sticky: false,
    life: 2000,
    closable: true,
    icon: "pi pi-info-circle",
}