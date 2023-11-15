import { endpoints } from "../../helpers/endpoints";
import { PromotionList } from "../auth/view/PromotionList";
import { CreatePromotion } from "./entry/CreatePromotion";

export const promotionRoutes = [
    {
        path: endpoints.promotionCreate,
        element: <CreatePromotion />
    },
    {
        path: endpoints.promotion,
        element: <PromotionList />
    }
]