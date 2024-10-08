
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
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "Promotion", url: paths.promotion },
                    { label: "Create", url: paths.promotionCreate }
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
                    { label: "Dashboard", url: paths.dashboard },
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
                    { label: "Dashboard", url: paths.dashboard },
                    { label: "List", url: paths.promotion },
                    { label: "Create", url: paths.promotionCreate }
                ],
                role: ['ADMINISTRATOR']
            }
        }
    }
]