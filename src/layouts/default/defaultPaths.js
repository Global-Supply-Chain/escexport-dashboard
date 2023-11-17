import { paths } from "../../constants/paths";

export const items = [
    {
        key: '0',
        label: 'Dashboard',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-desktop',
        url: "/"
    },
    {
        key: '1',
        label: "User",
        data: "User",
        icon: "pi pi-fw pi-user",
        children: [
            {
                key: '1-1',
                label: 'Create User',
                icon: 'pi pi-fw pi-plus',
                url: paths.userCreate
            },
            {
                key: '1-2',
                label: 'User List',
                icon: 'pi pi-fw pi-list',
                url: paths.user
            }
        ]
    },
];
