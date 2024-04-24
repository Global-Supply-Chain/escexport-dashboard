
import { keys } from "../../constants/config";
import { endpoints } from "../../constants/endpoints";
import { postRequest } from "../../helpers/api"
import { httpServiceHandler } from "../../helpers/handler";
import { setData } from "../../helpers/localstorage";
import { updateNotification } from "../../shares/shareSlice";
import { update } from "../admin/adminSlice";

export const authService = {
    login: async (payload, dispatch) => {
        const response = await postRequest(endpoints.login, payload);

        await httpServiceHandler(dispatch, response);

        if(response.status === 200) {
            setData(keys.API_TOKEN, response.data.access_token);
            setData(keys.USER, response.data.user);
            // setData(keys.ROLE,response.data.user.rnp.role);
            // setData(keys.PERMISSION,response.data.user.rnp.permissions);
            
            dispatch(update(response.data.user));
            dispatch(updateNotification({
                show: true,
                detail: response.message,
                severity: "success",
                summary: "Login Success"
            }))
        }
        
        return response;
    }
}