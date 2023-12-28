import React, { useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { authorizationPayload } from '../authorizationPayload';
import { payloadHandler } from '../../../helpers/handler';
import { InputText } from 'primereact/inputtext';
import { Loading } from '../../../shares/Loading';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { authorizationService } from '../authorizatonService';

export const RoleCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authorizationPayload.createRole);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
     * create role
     * @returns
     * 
     * **/
    const submitRoleCreate = async () => {
        setLoading(true);
        await authorizationService.roleCreate(dispatch,payload);
        setLoading(false);
    }


    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>

                <Card
                    title={translate.role_create}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="name" className='input-label'>{translate.name}</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="name"
                                    name="name"
                                    autoComplete='name'
                                    className="p-inputtext-sm"
                                    placeholder="Enter role name"
                                    value={payload.name}
                                    aria-describedby="name-help"
                                    tooltip="Role name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="description" className='input-label'>{translate.description}</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="description"
                                    name="description"
                                    autoComplete='description'
                                    className="p-inputtext-sm"
                                    placeholder="Enter role descripiton"
                                    value={payload.description}
                                    aria-describedby="description-help"
                                    tooltip="Role description"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'description', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="description" />
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
                                    onClick={() => navigate(paths.role)}
                                />

                                <Button
                                    className="mx-2"
                                    label={translate.submit}
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    onClick={() => submitRoleCreate()}
                                />
                            </div>
                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}
