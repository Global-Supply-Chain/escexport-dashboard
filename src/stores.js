import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";
import shareSlice from "./shares/shareSlice";
import adminSlice from "./modules/admin/adminSlice";
import userSlice from "./modules/user/userSlice";
import categorySlice from "./modules/category/categorySlice";
import itemSlice from "./modules/item/itemSlice";
import deliverySlice from "./modules/delivery/deliverySlice";
import mediaSlice from "./modules/media/mediaSlice";
import pointSlice from "./modules/point/pointSlice";

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice,
    share: shareSlice,
    admin: adminSlice,
    user: userSlice,
    category: categorySlice,
    item: itemSlice,
    delivery: deliverySlice,
    media: mediaSlice,
    point: pointSlice
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
  })

})