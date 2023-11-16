import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";
import shareSlice from "./shares/shareSlice";

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice,
    share: shareSlice
   }
})