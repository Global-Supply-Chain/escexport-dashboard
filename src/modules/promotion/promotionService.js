import { endpoints } from "../../constants/endpoints";
import { getRequest } from "../../helpers/api";
import { httpServiceHandler } from "../../helpers/handler";
import { index } from "./promotionSlice";


export const promotionService = {
    index: async(dispatch, params) => {
        const response = await getRequest(endpoints.promotion, params);
        await httpServiceHandler(dispatch, response);
        if(response.status === 200) {
            dispatch(index(response.data));
        }
        return response;
    }
}