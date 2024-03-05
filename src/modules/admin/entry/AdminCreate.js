
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminPayload } from "../adminPayload"
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { paths } from "../../../constants/paths";
import { adminService } from "../adminService";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Loading } from "../../../shares/Loading";
import { authorizationService } from "../../authorization/authorizatonService";
import { Dropdown } from "primereact/dropdown";
import { formBuilder } from "../../../helpers/formBuilder";
import { FormMainAction } from "../../../shares/FormMainAction";

export const AdminCreate = () => {

    const [payload, setPayload] = useState(adminPayload.create);
    const [loading, setLoading] = useState(false);
    const [roleList, setRoleList] = useState([]);
    
    const { translate } = useSelector(state => state.setting);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Loading data for role list
     * @return 
     * **/
    const loaidngData = useCallback(async () => {
        setLoading(true);
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

        setLoading(false);
    },[dispatch])

    useEffect(() => {
        loaidngData();
    }, [loaidngData])

    /**
     * Create Admin Account
     */
    const submitCreateAdmin = async () => {
        setLoading(true);

        const formData = formBuilder(payload,adminPayload.create);

        const response =  await adminService.store(formData,dispatch);
        if(response.data) {
            navigate(`${paths.admin}/${response.data.id}`);
          }
        setLoading(false);
    }

    return(
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>

            <div className="col-12">
                <Card 
                    title={translate.admin_create}
                    subTitle={translate.admin_subtitle}
                >

                    <Loading loading={loading} />

                    <div className="grid">

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="name" className='input-label text-black'>{translate.name} <span>(required*)</span></label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="name"
                                    name="name"
                                    autoComplete="admin name"
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="email" className='input-label text-black'>{translate.email} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="email"
                                    name="email"
                                    autoComplete="admin email address"
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="phone" className='input-label text-black'>{translate.phone} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <InputText 
                                    id="phone"
                                    name="phone"
                                    autoComplete="admin phone number"
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="role" className='input-label text-black'>{translate.role} <span>(required*)</span> </label>
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="password" className='input-label text-black'>{translate.password} <span>(required*)</span> </label>
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="confirm-password" className='input-label text-black'>{translate.con_password} <span>(required*)</span> </label>
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

                        <FormMainAction
                            cancel={translate.cancel}
                            onCancel={() => navigate(paths.admin)}
                            submit={translate.submit}
                            onSubmit={submitCreateAdmin}
                            loading={loading}
                        />


                    </div>
                </Card>
            </div>
        </div>
    )
}