import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Dropdown } from 'primereact/dropdown';
import { useCallback, useEffect, useState } from "react";
import { adminPayload } from "../adminPayload";
import { endpoints } from "../../../constants/endpoints";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from "../adminService";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";

export const AdminUpdate = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { admin } = useSelector(state => state.admin);

    const [payload, setPayload] = useState(adminPayload.update);
    const [loading, setLoading] = useState(false);
    const [adminStatus, setAdminStatus] = useState([]);

    const submitUpdateAdmin = async () => {
        setLoading(true);
        await adminService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await getRequest(`${endpoints.status}?type=user`);

        if(response.status === 200) {
            setAdminStatus(response.data.user);
        }

        await adminService.show(dispatch, params.id);
        setLoading(false);
    },[dispatch, params.id]);

    useEffect(() => {
        loadingData();
    },[loadingData]);

    useEffect(() => {
        if(admin) {
            setPayload(admin);
        }
    },[admin])

    return(
        <div className="col-12">
            <Card 
                title="Update Administrator Account"
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
                        <label htmlFor="name" className='input-label'>Full Name </label>
                        <div className="p-inputgroup mt-2">
                            <InputText 
                                id="name"
                                className="p-inputtext-sm"
                                placeholder="Enter account name"
                                value={payload.name ? payload.name : ""}
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
                        <label htmlFor="email" className='input-label'> Email </label>
                        <div className="p-inputgroup mt-2">
                            <InputText 
                                id="email"
                                className="p-inputtext-sm"
                                keyfilter={'email'}
                                aria-describedby="email-help"
                                placeholder="Enter email address"
                                value={payload.email ? payload.email : ""}
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
                        <label htmlFor="phone" className='input-label'> Phone Number </label>
                        <div className="p-inputgroup mt-2">
                            <InputText 
                                id="phone"
                                className="p-inputtext-sm"
                                aria-describedby="phone-help"
                                placeholder="Enter mobile phone number"
                                value={payload.phone ? payload.phone : ""}
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
                        <div className="flex flex-column gap-2">
                            <label htmlFor="status" className='input-label'> Status </label>
                            <Dropdown 
                                className="p-inputtext-sm text-black"
                                id="status"
                                options={adminStatus} 
                                placeholder="Select admin status" 
                                disabled={loading}
                                value={payload.status}
                                onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                            <ValidationMessage field={"status"} />
                        </div>
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3">
                        <label htmlFor="password" className='input-label'> Password </label>
                        <div className="p-inputgroup mt-2">
                            <InputText 
                                id="password"
                                className="p-inputtext-sm"
                                aria-describedby="password-help"
                                type="password"
                                placeholder="Enter password"
                                value={payload.password ? payload.password : ""}
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
                        <label htmlFor="confirm-password" className='input-label'> Confirm Password </label>
                        <div className="p-inputgroup mt-2">
                            <InputText 
                                id="confirm-password"
                                className="p-inputtext-sm"
                                aria-describedby="confirm-password-help"
                                type="password"
                                placeholder="Enter confirmation password"
                                value={payload.confirm_password ? payload.confirm_password : ""}
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
                                label="UPDATE"
                                severity="danger"
                                size='small'
                                disabled={loading}
                                onClick={() => submitUpdateAdmin()}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}