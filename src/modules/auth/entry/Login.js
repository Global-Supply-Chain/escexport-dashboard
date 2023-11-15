import { Card } from "primereact/card";
import { InputText } from 'primereact/inputtext';
import { Button } from "primereact/button";
import { useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [payload, setPayload] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();
    
    /**
     * Admin Login
     * Payload - [username, password]
     * @returns 
     */
    const submitLogin = () => {
        console.log(payload);
        navigate('/')
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
                            onChange={(e) => payloadHandler(payload, e.target.value, 'username', (updateValue) => {
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