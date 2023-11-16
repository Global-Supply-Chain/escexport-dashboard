
import { keys } from "../../constants/config";
import { paths } from "../../constants/paths"
import { postRequest } from "../../helpers/api"
import { setData } from "../../helpers/localstorage";
import { updateError, updateNotification } from "../../shares/shareSlice";

export const authService = {
    login: async (payload, dispatch) => {
        const response = await postRequest(paths.login, payload);

        if(response.status === 400 || response.status === 0) {
            dispatch(updateNotification(response.notification));
        }

        if(response.status === 422) {
            dispatch(updateError(response.error));
        }

        if(response.status === 200) {
            setData(keys.API_TOKEN, response.data.access_token);
            setData(keys.USER, response.data.user);
        }
        
        return response;
    }
}