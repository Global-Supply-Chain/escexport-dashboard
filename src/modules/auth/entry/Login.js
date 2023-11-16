import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { postRequest } from "../../../helpers/api";
import { getData, setData } from "../../../helpers/localstorage";
import { keys } from "../../../constants/config";

export const Login = () => {

    const [payload, setPayload] = useState({
        name: "",
        password: ""
    });
    const [token, setToken]= useState('');
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
    
    /**
     * Admin Login
     * Payload - [username, password]
     * @returns 
     */
    const submitLogin = async () => {
        setLoading(true);
        setErrors(null);

        // console.log(payload);
        // return
        const response = await postRequest(paths.login, payload);
        console.log(response);
        
        if(response && response.status === 200) {
            setData("TOKEN",response.data.data.access_token);
            setToken(response.data.data.access_token);
            // dispatch(updateNotification({
            //     title: "Login Success",
            //     message: response.message,
            //     status: 'success'
            // }));
            setLoading(false);
            if(getData(keys.API_TOKEN)) {
                navigate("/user")
            }
            return;
        }

        if(response && response.errors && response.errors.message) {
            // dispatch(updateNotification({
            //     title: "Login Fail",
            //     message: response.errors.message,
            //     status: 'fail'
            // }));  
            setLoading(false);
            return;
        }

        if(response && response.errors) {
            setErrors(response.errors);
            setLoading(false);
            return;
        }

        // dispatch(updateNotification({
        //     title: "Login Fail",
        //     message: response.message,
        //     status: 'fail'
        // }));  
        setLoading(false);
        return;

    }

    return(
        <div className="grid">
            <div className="col-12 md:col-6 lg:col-6 md:col-offset-3 my-8">
                <Card
                    title="Login"
                    subTitle="Administrator Login"
                >
                    <div className="p-inputgroup flex-1 my-5">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>

                        <InputText 
                            value={payload.username}
                            placeholder="Enter user account"
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>

                    <div className="p-inputgroup flex-1 my-5">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-lock"></i>
                        </span>

                        <InputText 
                            type="password"
                            placeholder="Enter password"
                            value={payload.password}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>

                    <div className="flex flex-row align-items-center justify-content-between w-full">
                        <a href="/auth/forget-password"> Forget Password? </a>
                        <Button 
                            severity="danger"
                            label="LOGIN"
                            onClick={() => submitLogin() }
                        />
                    </div>
                </Card>
            </div>
        </div>
    )   
}