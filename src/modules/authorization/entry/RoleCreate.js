import React, { useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { authorizationPayload } from '../authorizationPayload';
import { payloadHandler } from '../../../helpers/handler';
import { InputText } from 'primereact/inputtext';
import { Loading } from '../../../shares/Loading';
import { Card } from 'primereact/card';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { authorizationService } from '../authorizatonService';
import { FormMainAction } from '../../../shares/FormMainAction';

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
        await authorizationService.roleCreate(dispatch, payload);
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
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

                        <div className="col-12 md:col-4 lg:col-4 my-3 py-3">
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

                        <FormMainAction
                            cancel={translate.cancel}
                            onCancel={() => navigate(paths.role)}
                            submit={translate.submit}
                            onSubmit={submitRoleCreate}
                            loading={loading}
                        />

                    </div>

                </Card>

            </div>

        </div>
    )
}
