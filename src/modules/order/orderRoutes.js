import { paths } from "../../constants/paths"
import OrderDetail from "./view/OrderDetail"
import OrderList from "./view/OrderList"


export const orderRoutes = [
    {
        id : "orderList",
        path : paths.order,
        element : <OrderList />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.order },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "orderDetail",
        path : paths.orderDetail,
        element : <OrderDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.order },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]