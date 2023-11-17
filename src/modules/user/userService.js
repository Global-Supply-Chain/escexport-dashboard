import { paths } from "../../constants/paths"
import { postRequest } from "../../helpers/api"
import { updateError, updateNotification } from "../../shares/shareSlice";


export const userService = {
    createUser: async (payload, dispatch, navigate) => {
        const response = await postRequest(paths.user, payload);

        if (response?.status === 400 || response.status === 0) {
            dispatch(updateNotification(response.notification));
        }

        if (response?.status === 422) {
            dispatch(updateError(response.error));
        }

        if (response?.status === 401) {
            navigate('auth/login')
        }

        if (response?.status === 200) {
            dispatch(updateNotification({
                status: response.status, 
                message : response.message,
                notification: {
                    show: true,
                    severity: "success",
                    summary: "Success Message",
                    detail: response.message
                }
            }));
        }

        return response;

    }

}