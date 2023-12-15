import { paths } from "../../constants/paths"
import { CreateDelivery } from "./entry/CreateDelivery"
import { DeliveryDetail } from "./view/DeliveryDetail"
import { DeliveryList } from "./view/DeliveryList"

export const deliveryRoutes = [
    {
        id: "delivery",
        path: paths.delivery,
        element: <DeliveryList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Delivery", url: paths.delivery },
                ],
                role: ['ADMINISTRATOR']
            }
        },
        
    },
    {
        id: "deliveryCreate",
        path: paths.deliveryCreate,
        element: <CreateDelivery />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.delivery },
                    { label: "Create", url: paths.deliveryCreate }
                ]
            }
        }
    },
    {
        id: "deliveryDetail",
        path : paths.deliveryDetail,
        element: <DeliveryDetail />,
        loader: () => {
            return {
                breadcrumbs: [
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.delivery },
                ]
            }
        }
    }
]