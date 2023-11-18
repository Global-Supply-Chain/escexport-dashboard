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
                label: 'User List',
                icon: 'pi pi-fw pi-list',
                url: paths.user
            },
            {
                key: '1-2',
                label: 'Create User',
                icon: 'pi pi-fw pi-plus',
                url: paths.userCreate
            },
        ]
    },
    {
        key: '2',
        label: 'Administrator',
        icon: 'pi pi-fw pi-users',
        children: [
            {
                key: '2-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.admin
            },
            {
                key: '2-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.adminCreate
            }
        ]
    }
];
