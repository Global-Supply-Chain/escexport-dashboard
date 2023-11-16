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
 * life [number]
 * closeable [boolean | default -> true]
 */
export const notificationOptions = {
    severity: "info",
    sticky: false,
    life: 2000,
    closable: true,
    icon: "pi pi-info-circle",
}

export const statusOptions = [
    { status: "ACTIVE", color: "chip-success" },
    { status: "DISABLE", color: "chip-default" },
    { status: "PENDING", color: "chip-warn" },
    { status: "BLOCK", color: "chip-danger" }
];