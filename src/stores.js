import { configureStore } from "@reduxjs/toolkit";
import promotionSlice from "./modules/promotion/promotionSlice";

export const stores = configureStore({
   reducer: {
    promotion: promotionSlice
   }
})