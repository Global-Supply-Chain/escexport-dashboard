import { endpoints } from "../../constants/endpoints";
import { getRequest, postRequest, putRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";
import { mainIndex, mainUpdate } from "./categorySlice";

export const categoryService = {
  mainIndex: async (dispatch, params) => {
    const response = await getRequest(endpoints.category, params);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
      dispatch(
        mainIndex(response.data.data ? response.data.data : response.data)
      );
    }
    return response;
  },

  mainCategoryStore: async (dispatch, payload) => {
    const response = await postRequest(endpoints.category, payload);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }
    return response;
  },

  mainCategoryShow: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.category}/${id}`);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
        dispatch(mainUpdate(response.data));
    }
    return response;
  },

  mainCategoryUpdate: async (dispatch, id, payload) => {
    const response = await putRequest(`${endpoints.category}/${id}`, payload);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
        dispatch(mainUpdate(response.data));
        dispatch(
          updateNotification({
            show: true,
            summary: "Success",
            severity: "success",
            detail: response.message,
          })
        );
      }
  },

  index: async (dispatch, params) => {
    const response = await getRequest(endpoints.category, params);
    await httpServiceHandler(dispatch, response);
    if (response.status === 200) {
      dispatch(mainIndex(response.data.data));
    }
    return response;
  },

  store: async (payload, dispatch) => {
    const response = await postRequest(endpoints.category, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },
  show: async (dispatch, id) => {
    const response = await getRequest(`${endpoints.category}/${id}`);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },
  update: async (dispatch, id, payload) => {
    const response = await putRequest(`${endpoints.category}/${id}`, payload);
    await httpServiceHandler(dispatch, response);

    if (response.status === 200) {
      dispatch(
        updateNotification({
          show: true,
          summary: "Success",
          severity: "success",
          detail: response.message,
        })
      );
    }

    return response;
  },
};
