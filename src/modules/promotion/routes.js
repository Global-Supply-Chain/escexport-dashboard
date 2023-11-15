
import { paths } from "../../constants/paths";
import { PromotionList } from "./view/PromotionList";
import { CreatePromotion } from "./entry/CreatePromotion";

export const promotionRoutes = [
    {
        path: paths.promotionCreate,
        element: <CreatePromotion />
    },
    {
        path: paths.promotion,
        element: <PromotionList />
    }
]