import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/default";
import { NotFound } from "./layouts/default/pages/NotFound";
import { BlankTemplate } from "./layouts/default/pages/BlankTemplate";
import { Login } from "./modules/auth/entry/Login";
import { promotionRoutes } from "./modules/promotion/promotionRoutes";
import { userRoutes } from "./modules/user/userRoutes";
import { adminRoutes } from "./modules/admin/adminRoutes";
import { itemRoutes } from "./modules/item/itemRoutes";
import { deliveryRoutes } from "./modules/delivery/deliveryRoutes";
import { mediaRoutes } from "./modules/media/mediaRoute";
import { pointRoutes } from "./modules/point/pointRoutes";
import { orderRoutes } from "./modules/order/orderRoutes";
import { faqRoutes } from "./modules/faq/faqRoutes";
import { regionRoutes } from "./modules/region/regionRoutes";
import { shopRoutes } from "./modules/shop/shopRoutes";
import { categoryRoutes } from "./modules/category/categoryRoutes";
import { dashbardRoutes } from "./modules/dashboard/dashboardRoutes";
import { authorizationRoute } from "./modules/authorization/authorizationRoute";
import { settingRoutes } from "./modules/setting/settingRoutes";
import { discountRoutes } from "./modules/discount/discountRoutes";
import { memberCardRoutes } from "./modules/memberCard/memberCardRoute";
import { memberRoutes } from "./modules/member/memberRoute";
import { memberOrderRoutes } from "./modules/memberOrder/memberOrderRoute";
import { countryRoutes } from "./modules/country/countryRoutes";
import { regionAndStateRoutes } from "./modules/regionAndState/regionAndStateRoutes";
import { cityRoutes } from "./modules/city/cityRoutes";
import { townshipRoutes } from "./modules/township/townshipRoutes";

export const routers = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        errorElement: <NotFound />,
        children: [
            ...dashbardRoutes,
            ...promotionRoutes,
            ...userRoutes,
            ...adminRoutes,
            ...categoryRoutes,
            ...itemRoutes,
            ...deliveryRoutes,
            ...mediaRoutes,
            ...pointRoutes,
            ...orderRoutes,
            ...faqRoutes,
            ...regionRoutes,
            ...shopRoutes,
            ...discountRoutes,
            ...memberCardRoutes,
            ...memberRoutes,
            ...memberOrderRoutes,
            ...authorizationRoute,
            ...settingRoutes,
            ...countryRoutes,
            ...regionAndStateRoutes,
            ...cityRoutes,
            ...townshipRoutes
        ]
    },
    {
        path: "auth",
        element: <BlankTemplate />,
        errorElement: <NotFound />,
        children: [
            {
                path: "login",
                element: <Login />
            }
        ]
    }
])