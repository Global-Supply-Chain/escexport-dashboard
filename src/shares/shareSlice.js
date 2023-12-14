import { createSlice } from "@reduxjs/toolkit";
import { notificationOptions } from "../constants/config";

const shareSlice = createSlice({
  name: "share",
  initialState: {
    notification: {
      ...notificationOptions,
      summary: null,
      detail: null,
    },
    errors: null,
    showSidebar: false,
    statusFilter: "ALL",
    startFilterDate: null,
    endFilterDate: null
  },
  reducers: {
    updateNotification: (state, action) => {
      state.notification = {
        ...notificationOptions,
        ...action.payload,
      };
      return state;
    },
    updateError: (state, action) => {
      state.errors = { ...action.payload };
      return state;
    },
    sidebarToggle: (state) => {
      state.showSidebar = !state.showSidebar;
      return state;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
      return state;
    },
    setDateFilter: (state,action) => {
        state.startFilterDate = action.payload.startDate;
        state.endFilterDate = action.payload.endDate;
        return state;
    }
  },
});

export const {
  updateNotification,
  updateError,
  sidebarToggle,
  setStatusFilter,
  setDateFilter
} = shareSlice.actions;
export default shareSlice.reducer;
