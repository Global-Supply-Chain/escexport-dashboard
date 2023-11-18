import { Button } from "primereact/button";

const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
const paginatorRight = <Button type="button" icon="pi pi-download" text />;


export const paginateOptions = {
    rows: 50,
    rowsPerPageOptions: [50,100,150,500,1000],
    total: 0,
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "{first} to {last} of {totalRecords}",
    paginatorLeft: paginatorLeft, 
    paginatorRight: paginatorRight,
    sortMode: "multiple"
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

export const tooltipOptions = {
   position: 'top'
}