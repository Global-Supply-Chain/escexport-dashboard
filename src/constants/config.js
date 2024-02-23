import { Button } from "primereact/button";
import { getData } from "../helpers/localstorage";

const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
// const paginatorRight = <Button type="button" icon="pi pi-download" text />;

export const env = [
    'http://api.gscexport.com/dashboard',
    'http://localhost:8000/dashboard',
];

export const paginateOptions = {
    rows: 10,
    rowsPerPageOptions: [10,50,100,150,500,1000],
    total: 0,
    paginatorTemplate: "RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink",
    currentPageReportTemplate: "{first} to {last} of {totalRecords}",
    paginatorLeft: paginatorLeft, 
    sortMode: "single",
    resizableColumns: true,
    lazy: true
}

export const keys = {
    API_TOKEN: "TOKEN",
    USER: "USER",
    PERMISSION: "PERMISSION",
    ROLE: "ROLE",
    LANGUAGE: "LANGUAGE"
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
    { status: "DELETED", color: "chip-info" },
    { status: "PENDING", color: "chip-warn" },
    { status: "BLOCK", color: "chip-danger" },
    { status: "COMPLETE", color: "chip-success" }
];

export const tooltipOptions = {
   position: 'top'
}

export const auditColumns = [
    { field: "created_by", header: "Created By" },
    { field: "updated_by", header: "Updated By" },
    { field: "created_at", header: "Created At" },
    { field: "updated_at", header: "Updated At" },
    { field: "deleted_at", header: "Deleted At" },
];

export const responsiveOptions = [
    {
        breakpoint: '991px',
        numVisible: 4
    },
    {
        breakpoint: '767px',
        numVisible: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
];

export const itemTemplate = (item) => {
    return <img src={item?.itemImageSrc} alt={'GSC Export'} style={{ width: '100%', minHeight: '368px', display: 'block' }} />;
}

export const thumbnailTemplate = (item) => {
    return <img width={100} height={80} src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
}

/**
 * Language / Region / Country
 */
export const countries = [
    { name: 'China', code: 'CN' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'English', code: 'UK' }
];
export const defaultLanguage = getData(keys.LANGUAGE) ? getData(keys.LANGUAGE) : countries[1];

export const renderHeader = () => {
    return (
        <span className="ql-formats">
            <select className="ql-font">
                <option value="serif"></option>
                <option value="sans-serif"></option>
                <option value="monospace"></option>
            </select>
            <select className="ql-size">
                <option value="small"></option>
                <option value="large"></option>
                <option value="huge"></option>
            </select>
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
            <button className="ql-align" aria-label="Align"></button>
            <button className="ql-color" aria-label="Color"></button>
            <button className="ql-background" aria-label="Background"></button>
            <button className="ql-list" aria-label="Ordered"></button>
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
            <button className="ql-code" aria-label="Code"></button>
            <button className="ql-link" aria-label="Link"></button>
            <button className="ql-clean" aria-label="Clean"></button>
        </span>
    );
};