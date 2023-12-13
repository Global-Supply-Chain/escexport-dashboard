import { keys } from "../../constants/config"
import { paths } from "../../constants/paths"
import { getData } from "../../helpers/localstorage"
import { CreateShop } from "./entry/CreateShop"
import { ShopDetail } from "./view/ShopDetail"
import { ShopList } from "./view/ShopList"

export const shopRoutes = [
    {
        id: "shop",
        path: paths.shop,
        element: <ShopList />,
        loader : () => {
            const role = getData(keys.ROLE);
            const permission = getData(keys.PERMISSION);
            const per = permission.filter((per) => per === "SHOP_INDEX");
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.shop },
                ],
                role: role,
                permission: per
            }
        },
        
    },
    {
        id: "shopCreate",
        path: paths.shopCreate,
        element: <CreateShop />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.shop },
                    { label: "Create", url: paths.shopCreate }
                ]
            }
        }
    },
    {
        id: "shopDetail",
        path : paths.shopDetail,
        element: <ShopDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.shopDetail },
                ]
            }
        }
    }
]