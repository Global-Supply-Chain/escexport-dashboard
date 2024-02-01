import { paths } from "../../constants/paths";

export const items = [
    {
        key: '0',
        label: 'menu_dashboard',
        data: 'Documents Folder',
        icon: 'pi pi-fw pi-desktop',
        url: "/dashboard"
    },
    {
        key: '1',
        label: "menu_user",
        icon: "pi pi-fw pi-user",
        children: [
            {
                key: '1-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.user
            },
            {
                key: '1-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.userCreate
            },
        ]
    },
    {
        key: '2',
        label: 'menu_administrator',
        icon: 'pi pi-fw pi-users',
        children: [
            {
                key: '2-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.admin
            },
            {
                key: '2-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.adminCreate
            }
        ]
    },
    // {
    //     key: '3',
    //     label: 'menu_promotion',
    //     icon: 'pi pi-fw pi-verified',
    //     children: [
    //         {
    //             key: '3-1',
    //             label: 'menu_list',
    //             icon: 'pi pi-fw pi-list',
    //             url: paths.promotion
    //         },
    //         {
    //             key: '3-2',
    //             label: 'menu_create',
    //             icon: 'pi pi-fw pi-plus',
    //             url: paths.promotionCreate
    //         }
    //     ]
    // },
    {
        key: '3',
        label: 'menu_discount',
        icon: 'pi pi-fw pi-verified',
        children: [
            {
                key: '3-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.discount
            },
            {
                key: '3-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.discountCreate
            }
        ]
    },
    {
        key: '4',
        label: 'menu_category',
        icon: 'pi pi-fw pi-clone',
        children: [
            {
                key: '4-1',
                label: 'menu_main_category',
                icon: 'pi pi-fw pi-list',
                url: paths.category
            },
            {
                key: '4-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.createMainCategory
            },
        ]
    },
    {
        key: '5',
        label: 'menu_item',
        icon: 'pi pi-fw pi-inbox',
        children: [
            {
                key: '5-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.item
            },
            {
                key: '5-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.itemCreate
            }
        ]
    },
    {
        key: '6',
        label: 'menu_delivery',
        icon: 'pi pi-fw pi-car',
        children: [
            {
                key: '6-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.delivery
            },
            {
                key: '6-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.deliveryCreate
            }
        ]
    },
    // {
    //     key: '7',
    //     label: 'Media',
    //     icon: 'pi pi-fw pi-images',
    //     children: [
    //         {
    //             key: '7-1',
    //             label: 'List',
    //             icon: 'pi pi-fw pi-list',
    //             url: paths.media
    //         },
    //         // {
    //         //     key: '6-2',
    //         //     label: 'Create',
    //         //     icon: 'pi pi-fw pi-plus',
    //         //     url: paths.itemCreate
    //         // }
    //     ]
    // },
    {
        key: '8',
        label: 'menu_point',
        icon: 'pi pi-fw pi-ticket',
        children: [
            {
                key: '8-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.point
            },
            {
                key: '8-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.pointCreate
            }
        ]
    },
    {
        key: '9',
        label: 'menu_order',
        icon: 'pi pi-fw pi-shopping-cart',
        children: [
            {
                key: '9-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.order
            },
        ]
    },
    {
        key: '10',
        label: 'menu_faq',
        icon: 'pi pi-fw pi-comment',
        children: [
            {
                key: '10-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.faq
            },
            {
                key: '10-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.faqCreate
            }
        ]
    },
    {
        key: '11',
        label: 'menu_region',
        icon: 'pi pi-fw pi-flag',
        children: [
            {
                key: '11-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.region
            },
            {
                key: '11-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.regionCreate
            }
        ]
    },
    {
        key: '12',
        label: 'menu_shop',
        icon: 'pi pi-fw pi-map',
        children: [
            {
                key: '12-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.shop
            },
            {
                key: '12-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.shopCreate
            }
        ]
    },
    {
        key: '13',
        label: 'menu_role',
        icon: 'pi pi-fw pi-share-alt',
        children: [
            {
                key: '13-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.role
            },
            {
                key: '13-2',
                label: 'menu_create',
                icon: 'pi pi-fw pi-plus',
                url: paths.roleCreate
            }
        ]
    },
    {
        key: '14',
        label: 'menu_permission',
        icon: 'pi pi-fw pi-lock',
        children: [
            {
                key: '14-1',
                label: 'menu_list',
                icon: 'pi pi-fw pi-list',
                url: paths.permission
            },
        ]
    },
    {
        key: '15',
        url: "/setting",
        label: 'menu_setting',
        icon: 'pi pi-fw pi-cog'
    },
];
