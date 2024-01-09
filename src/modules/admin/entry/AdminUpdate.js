import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext"
import { Dropdown } from 'primereact/dropdown';
import { useCallback, useEffect, useState } from "react";
import { adminPayload } from "../adminPayload";
import { endpoints } from "../../../constants/endpoints";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from "../../../constants/config";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { adminService } from "../adminService";
import { paths } from "../../../constants/paths";
import { getRequest } from "../../../helpers/api";
import { Loading } from "../../../shares/Loading";
import { authorizationService } from "../../authorization/authorizatonService";
import { Profile } from "../../../shares/Profile";
import { formBuilder } from "../../../helpers/formBuilder";

export const AdminUpdate = () => {

    const [roleList, setRoleList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const { admin } = useSelector(state => state.admin);
    const { translate } = useSelector(state => state.setting);

    const [payload, setPayload] = useState(adminPayload.update);
    const [loading, setLoading] = useState(false);
    const [adminStatus, setAdminStatus] = useState([]);

    const submitUpdateAdmin = async () => {
        setLoading(true);

        const formData = formBuilder(payload,adminPayload.update);

        await adminService.update(dispatch, formData);
        setLoading(false);
    }

    const loadingData = useCallback(async () => {
        setLoading(true);
        const response = await getRequest(`${endpoints.status}?type=user`);

        if (response.status === 200) {
            setAdminStatus(response.data.user);
        }
        const result = await authorizationService.roleIndex(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((role) => {
                return {
                    label: role?.name,
                    value: role?.id
                }
            })
            setRoleList(formatData);
        }

        await adminService.show(dispatch, params.id);
        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        if (admin) {
            setPayload(admin);
        }
    }, [admin])

    return (
        <div className="col-12">
            <Card
                title={translate.admin_update}
                subTitle={translate.admin_subtitle}
            >

                <Loading loading={loading} />

                <div className="grid">
                    <div className='col-12 flex align-items-center justify-content-center'>
                        <form className="w-full flex flex-column justify-content-center align-items-center">
                            <Profile
                                payload={payload}
                                setPayload={setPayload}
                                field={'profile'}
                                src={Number(payload.profile) ? `${endpoints.image}/${payload.profile}` : null}
                            />

                            <ValidationMessage field={'file'} />
                            <ValidationMessage field={'profile'} />
                        </form>
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3">
                        <label htmlFor="name" className='input-label'>{translate.name}</label>
                        <div className="p-inputgroup mt-2">
                            <InputText
                                id="name"
                                name="name"
                                autoComplete="admin name"
                                className="p-inputtext-sm"
                                placeholder="Enter account name"
                                value={payload.name ? payload.name : ""}
                                aria-describedby="name-help"
                                tooltip="Administrator's full name"
                                tooltipOptions={{ ...tooltipOptions }}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field="name" />
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3">
                        <label htmlFor="email" className='input-label'>{translate.email}</label>
                        <div className="p-inputgroup mt-2">
                            <InputText
                                id="email"
                                name="admin email"
                                autoComplete="admin email"
                                className="p-inputtext-sm"
                                keyfilter={'email'}
                                aria-describedby="email-help"
                                placeholder="Enter email address"
                                value={payload.email ? payload.email : ""}
                                tooltip="Email Address (admin@example.com)"
                                tooltipOptions={{ ...tooltipOptions }}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field="email" />
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3">
                        <label htmlFor="phone" className='input-label'>{translate.phone}</label>
                        <div className="p-inputgroup mt-2">
                            <InputText
                                id="phone"
                                name="admin phone"
                                autoComplete="admin phone"
                                className="p-inputtext-sm"
                                aria-describedby="phone-help"
                                placeholder="Enter mobile phone number"
                                value={payload.phone ? payload.phone : ""}
                                tooltip="Phone number can not start with (+95) and must be start with 9xxxxx"
                                tooltipOptions={{ ...tooltipOptions }}
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
                            <label htmlFor="status" className='input-label'>{translate.status}</label>
                            <Dropdown
                                className="p-inputtext-sm text-black"
                                inputId="status"
                                name="status"
                                autoComplete="admin status"
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
                        <label htmlFor="password" className='input-label'>{translate.password}</label>
                        <div className="p-inputgroup mt-2">
                            <InputText
                                id="password"
                                name="admin password"
                                className="p-inputtext-sm"
                                aria-describedby="password-help"
                                type="password"
                                placeholder="Enter password"
                                value={payload.password ? payload.password : ""}
                                tooltip="Password must be contain special chars"
                                tooltipOptions={{ ...tooltipOptions }}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field="password" />
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3">
                        <label htmlFor="confirm-password" className='input-label'>{translate.con_password}</label>
                        <div className="p-inputgroup mt-2">
                            <InputText
                                id="confirm-password"
                                name="confirm password for admin"
                                className="p-inputtext-sm"
                                aria-describedby="confirm-password-help"
                                type="password"
                                placeholder="Enter confirmation password"
                                value={payload.confirm_password ? payload.confirm_password : ""}
                                tooltip="Confirm password must be same password"
                                tooltipOptions={{ ...tooltipOptions }}
                                disabled={loading}
                                onChange={(e) => payloadHandler(payload, e.target.value, 'confirm_password', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>
                        <ValidationMessage field="confirm_password" />
                    </div>

                    <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                        <label htmlFor="role" className='input-label'>{translate.role}</label>
                        <div className="p-inputgroup mt-2">
                            <Dropdown
                                inputId="role"
                                name="role"
                                autoComplete="admin role"
                                value={payload.role_id}
                                onChange={(e) => payloadHandler(payload, e.value, 'role_id', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                                options={roleList}
                                placeholder="Select a role"
                                disabled={loading}
                                className="p-inputtext-sm"
                            />
                        </div>
                        <ValidationMessage field="role_id" />
                    </div>

                    <div className="col-12">
                        <div className="flex flex-row justify-content-end align-items-center">
                            <Button
                                className="mx-2"
                                label={translate.cancel}
                                severity="secondary"
                                outlined
                                size='small'
                                disabled={loading}
                                onClick={() => navigate(paths.admin)}
                            />

                            <Button
                                className="mx-2"
                                label={translate.update}
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