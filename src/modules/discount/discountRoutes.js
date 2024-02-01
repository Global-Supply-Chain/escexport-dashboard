import { paths } from "../../constants/paths"
import { DiscountCreate } from "./entry/DiscountCreate"
import { DiscountUpdate } from "./entry/DiscountUpdate"
import { DiscountList } from "./views/DiscountList"


export const discountRoutes = [
    {
        id : "discountList",
        path : paths.discount,
        element : <DiscountList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.discount },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "discountCreate",
        path: paths.discountCreate,
        element : <DiscountCreate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.discount },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "discountDetail",
        path: `/${paths.discount}/:id`,
        element: <DiscountUpdate />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.discount }
                ]
            }
        }
    }
]