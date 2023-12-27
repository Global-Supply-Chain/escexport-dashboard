import { createSlice } from "@reduxjs/toolkit";
import { defaultLanguage } from "../../constants/config";
import en from "../../assets/i18n/en.json";
import mm from "../../assets/i18n/mm.json";
import cn from "../../assets/i18n/cn.json";

const getDefaultLanguage = defaultLanguage.code.toLowerCase()
const settingSlice = createSlice({
    name: 'setting',
    initialState: {
        language: defaultLanguage,
        translate: getDefaultLanguage === "mm" ? mm : getDefaultLanguage === "uk" ? en : getDefaultLanguage === "cn" ? cn : mm 
    },
    reducers: {
        updateLanguage: (state, action) => {
            state.language = action.payload;
            const selectedLanguage = action.payload.code.toLowerCase();

            if(selectedLanguage === 'mm') {
                state.translate = mm;
            }

            if(selectedLanguage === 'uk') {
                state.translate = en;
            } 

            if(selectedLanguage === 'cn') {
                state.translate = cn;
            }

            return state;
        }
    }
});

export const { updateLanguage } = settingSlice.actions;
export default settingSlice.reducer;