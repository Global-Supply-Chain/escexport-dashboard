export const adminPayload = {
    create: {
        name: "",
        profile: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: ""
    },
    columns: [
        { field: "id", header: "ID", sortable: true },
        { field: "name", header: "Full Name", sortable: true },
        { field: "email", header: "Email", sortable: true },
        { field: "phone", header: "Phone", sortable: true },
        { field: "status", header: "Status" }
    ]
}