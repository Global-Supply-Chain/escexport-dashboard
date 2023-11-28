
import { paths } from "../../constants/paths";
import { PromotionList } from "./view/PromotionList";
import { CreatePromotion } from "./entry/CreatePromotion";
import PromotionDetail from "./view/PromotionDetail";

export const promotionRoutes = [
    {
        id: "promotion",
        path: paths.promotion,
        element: <PromotionList />,
        loader : () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Promotion", url: paths.promotion },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        path: paths.promotionCreate,
        element: <CreatePromotion />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "Promotion", url: paths.promotion },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    },
    {
        id: "promotionDetail",
        path : paths.promotionDetail,
        element : <PromotionDetail />,
        loader: () => {
            return{
                breadcrumbs: [
                    { label: "Dashboard", url: "/" },
                    { label: "List", url: paths.promotion },
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]