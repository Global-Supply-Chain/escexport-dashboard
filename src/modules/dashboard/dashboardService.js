import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { orderIndex } from "./dashboardSlice";


export const dashboardService = {
    orderIndex: async (dispatch) => {
        const response = await getRequest(`${endpoints.count}/${endpoints.order}`);
        console.log(response);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(orderIndex(response.data));
        }
        return response;
    },
}