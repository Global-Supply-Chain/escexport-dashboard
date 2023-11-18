import { endpoints } from "../../constants/endpoints"
import { postRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { updateNotification } from "../../shares/shareSlice";

export const adminService = {
    store: async (payload, dispatch) => {
        const response = await postRequest(endpoints.admin, payload);
        await httpServiceHandler(dispatch, response);

        console.log(response);
        
        if(response.status === 200) {
            dispatch(updateNotification( {
                show: true,
                summary: "Success",
                severity: "success",
                detail: response.message
            }));
        }

        return response;
    }
}