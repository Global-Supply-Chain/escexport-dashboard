import { postRequest } from "./api";
import { httpServiceHandler } from "./handler";

export const uploadFile = {
    image: async (dispatch, file, cateogry) => {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('category', cateogry);
        formData.append('method', 'PUT');

        const response = await postRequest("file/upload/image", formData);
        await httpServiceHandler(dispatch, response);
        return response;
    }
}