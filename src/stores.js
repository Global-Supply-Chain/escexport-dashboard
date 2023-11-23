import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";
import userSlice from "./modules/user/userSlice";
import categorySlice from "./modules/category/categorySlice";
import itemSlice from "./modules/item/itemSlice";
import deliverySlice from "./modules/delivery/deliverySlice";
import mediaSlice from "./modules/media/mediaSlice";

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice,
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
    category: categorySlice,
    item: itemSlice,
    delivery: deliverySlice,
    media: mediaSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })

})