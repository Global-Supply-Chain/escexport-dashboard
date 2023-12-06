import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { countIndex, itemIndex, orderIndex, userIndex } from "./dashboardSlice";


export const dashboardService = {
    countIndex: async (dispatch) => {
        const response = await getRequest(`${endpoints.count}`);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(countIndex(response.data));
        }
        return response;
    },
    orderIndex: async (dispatch) => {
        const response = await getRequest(`${endpoints.count}/${endpoints.order}`);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(orderIndex(response.data));
        }
        return response;
    },
    itemIndex: async (dispatch) => {
        const response = await getRequest(`${endpoints.count}/${endpoints.item}`);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(itemIndex(response.data));
        }
        return response;
    },
    userIndex: async (dispatch) => {
        const response = await getRequest(`${endpoints.count}/${endpoints.user}`);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(userIndex(response.data));
        }
        return response;
    }
}