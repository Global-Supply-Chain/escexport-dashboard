import { paths } from "../../constants/paths"
import { CreateShop } from "./entry/CreateShop"
import { ShopDetail } from "./view/ShopDetail"
import { ShopList } from "./view/ShopList"

export const shopRoutes = [
    {
        id: "shop",
        path: paths.shop,
        element: <ShopList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.shop },
                ],
                role: ['ADMINISTRATOR']
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