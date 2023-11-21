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
                label: 'List',
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
    },
    {
        key: '3',
        label: 'Promotion',
        icon: 'pi pi-fw pi-users',
        children: [
            {
                key: '3-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.promotion
            },
            {
                key: '3-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.promotionCreate
            }
        ]
    },
    {
        key: '4',
        label: 'Category',
        icon: 'pi pi-fw pi-users',
        children: [
            {
                key: '4-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.category
            },
            {
                key: '4-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.categoryCreate
            }
        ]
    }
];
