
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminPayload } from "../adminPayload"
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { adminService } from "../adminService";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { uploadFile } from "../../../helpers/uploadFile";
import { endpoints } from "../../../constants/endpoints";

export const AdminCreate = () => {

    const [payload, setPayload] = useState(adminPayload.create);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Create Admin Account
     */
    const submitCreateAdmin = async () => {
        setLoading(true);
        await adminService.store(payload,dispatch);
        setLoading(false);
    }

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card 
                    title="Create Administrator Account"
                    subTitle="Administrator account is purposing for system management"
                >
                    <div className="grid">
                        <div className='col-12 flex align-items-center justify-content-center'>
                            <form className="w-full flex flex-column justify-content-center align-items-center">
                                <Avatar 
                                    className="mb-3"
                                    icon="pi pi-user" 
                                    size="xlarge" 
                                    shape="circle"
                                    image={payload.profile ? `${endpoints.image}/${payload.profile}` : null}
                                    onClick={() => {
                                        document.getElementById('profile').click();
                                    }}
                                />
                                <input 
                                    className='hidden'
                                    id="profile" 
                                    type='file' 
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const result = await uploadFile.image(dispatch, e.target.files[0], 'ADMIN_PROIFLE');
                                        if(result.status === 200) {
                                            payloadHandler(payload, result.data.id, 'profile', (updateValue) => {
                                                setPayload(updateValue);
                                            });
                                        }
                                    }}
                                />

                                <ValidationMessage field={'file'} />
                            </form>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="name" className='input-label'>Full Name (required)</label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter account name"
                                    value={payload.name}
                                    aria-describedby="name-help"
                                    tooltip="Administrator's full name"
                                    tooltipOptions={{...tooltipOptions}}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="email" className='input-label'> Email (required) </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="email"
                                    className="p-inputtext-sm"
                                    keyfilter={'email'}
                                    aria-describedby="email-help"
                                    placeholder="Enter email address"
                                    value={payload.email}
                                    tooltip="Email Address (admin@example.com)"
                                    tooltipOptions={{...tooltipOptions}}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="email" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="phone" className='input-label'> Phone Number (required) </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="phone"
                                    className="p-inputtext-sm"
                                    aria-describedby="phone-help"
                                    placeholder="Enter mobile phone number"
                                    value={payload.phone}
                                    tooltip="Phone number can not start with (+95) and must be start with 9xxxxx"
                                    tooltipOptions={{...tooltipOptions}}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="password" className='input-label'> Password(required) </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="password"
                                    className="p-inputtext-sm"
                                    aria-describedby="password-help"
                                    type="password"
                                    placeholder="Enter password"
                                    value={payload.password}
                                    tooltip="Password must be contain special chars"
                                    tooltipOptions={{...tooltipOptions}}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="password" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="confirm-password" className='input-label'> Confirm Password(required) </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="confirm-password"
                                    className="p-inputtext-sm"
                                    aria-describedby="confirm-password-help"
                                    type="password"
                                    placeholder="Enter confirmation password"
                                    value={payload.confirm_password}
                                    tooltip="Confirm password must be same password"
                                    tooltipOptions={{...tooltipOptions}}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'confirm_password', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="confirm_password" />
                        </div>

                        <div className="col-12">
                            <div className="flex flex-row justify-content-end align-items-center">
                                <Button 
                                    className="mx-2"
                                    label="CANCEL"
                                    severity="secondary"
                                    outlined
                                    size='small'
                                    disabled={loading}
                                    onClick={() => navigate(paths.admin)}
                                />

                                <Button 
                                    className="mx-2"
                                    label="CREATE"
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    onClick={() => submitCreateAdmin()}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}