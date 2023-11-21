import { paths } from "../../constants/paths"
import { DeliveryList } from "./view/DeliveryList"

export const deliveryRoutes = [
    {
        id: "delivery",
        path: paths.delivery,
        element: <DeliveryList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Delivery", url: paths.delivery },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
]