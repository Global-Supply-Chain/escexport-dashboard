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
import { useDispatch } from 'react-redux';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { authorizationService } from '../authorizatonService';

export const RoleCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authorizationPayload.createRole);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                    title={'Create Role'}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="name" className='input-label'>Name</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="name"
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
                            <label htmlFor="description" className='input-label'>Description</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="description"
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
                                    label="CANCEL"
                                    severity="secondary"
                                    outlined
                                    size='small'
                                    disabled={loading}
                                    onClick={() => navigate(paths.role)}
                                />

                                <Button
                                    className="mx-2"
                                    label="CREATE"
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
