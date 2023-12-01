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
        icon: 'pi pi-fw pi-ticket',
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
        icon: 'pi pi-fw pi-clone',
        children: [
            {
                key: '4-1',
                label: 'Main Category',
                icon: 'pi pi-fw pi-list',
                url: paths.mainCategory
            },
            {
                key: '4-2',
                label: 'Category',
                icon: 'pi pi-fw pi-list',
                url: paths.category
            },
            {
                key: '4-3',
                label: 'Create Main Category',
                icon: 'pi pi-fw pi-plus',
                url: paths.createMainCategory
            },
            {
                key: '4-4',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.categoryCreate
            }
        ]
    },
    {
        key: '5',
        label: 'Item',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '5-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.item
            },
            {
                key: '5-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.itemCreate
            }
        ]
    },
    {
        key: '6',
        label: 'Delivery',
        icon: 'pi pi-fw pi-car',
        children: [
            {
                key: '6-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.delivery
            },
            {
                key: '6-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.deliveryCreate
            }
        ]
    },
    {
        key: '7',
        label: 'Media',
        icon: 'pi pi-fw pi-images',
        children: [
            {
                key: '7-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.media
            },
            // {
            //     key: '6-2',
            //     label: 'Create',
            //     icon: 'pi pi-fw pi-plus',
            //     url: paths.itemCreate
            // }
        ]
    },
    {
        key: '8',
        label: 'Point',
        icon: 'pi pi-fw pi-box',
        children: [
            {
                key: '8-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.point
            },
            {
                key: '8-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.pointCreate
            }
        ]
    },
    {
        key: '9',
        label: 'Order',
        icon: 'pi pi-fw pi-shopping-cart',
        children: [
            {
                key: '9-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.order
            },
        ]
    },
    {
        key: '10',
        label: 'Faq',
        icon: 'pi pi-fw pi-comment',
        children: [
            {
                key: '10-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.faq
            },
            {
                key: '10-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.faqCreate
            }
        ]
    },
    {
        key: '11',
        label: 'Region',
        icon: 'pi pi-fw pi-comment',
        children: [
            {
                key: '11-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.region
            },
            {
                key: '11-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.regionCreate
            }
        ]
    },
    {
        key: '12',
        label: 'Shop',
        icon: 'pi pi-fw pi-comment',
        children: [
            {
                key: '12-1',
                label: 'List',
                icon: 'pi pi-fw pi-list',
                url: paths.shop
            },
            {
                key: '12-2',
                label: 'Create',
                icon: 'pi pi-fw pi-plus',
                url: paths.shopCreate
            }
        ]
    },
];
