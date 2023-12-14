import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { authorizationPayload } from '../authorizationPayload';
import { Loading } from '../../../shares/Loading';
import { paths } from '../../../constants/paths';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { tooltipOptions } from '../../../constants/config';
import { Card } from 'primereact/card';
import { authorizationService } from '../authorizatonService';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

const formatMultiSelect = (value) => {
    const permissionFormat = value?.map((per) => {
        let id = [];
        if (per?.id) {
            id.push(...id, per?.id);
        }
        if (per?.code) {
            id.push(...id, per?.code);
        }
        return id;
    })
    return permissionFormat?.flat();
}

export const RoleUpdate = ({ dataSource, callback }) => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authorizationPayload.updateRole);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * update role
     * @returns
     * 
     * **/
    const submitUpdateRole = async () => {
        setLoading(true);
        const permissionFormat = formatMultiSelect(payload?.permissions)

        const mainPayload = {
            name: payload.name,
            description: payload.description,
            permissions : permissionFormat
        }

        await authorizationService.roleUpdate(dispatch, dataSource.id, mainPayload);
        callback()
        setLoading(false);
    }


    useEffect(() => {
        if (dataSource) {
            setPayload(dataSource?.role)
        }
    }, [dataSource])

    return (
        <Card
            title={'Update Role'}
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
                            value={payload?.name ? payload?.name : ''}
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
                            value={payload?.description ? payload?.description : ''}
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

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="permission" className='input-label'> Permission </label>
                    <div className="p-inputgroup mt-2">
                        <MultiSelect
                            value={payload?.permissions}
                            onChange={(e) => {
                                payloadHandler(payload, e.value, 'permissions', (updateValue) => {
                                    setPayload(updateValue);
                                })
                            }}
                            optionLabel="name"
                            options={dataSource?.permissionList}
                            placeholder="Select a permission"
                            disabled={loading}
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="permissions" />
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
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={() => submitUpdateRole()}
                        />
                    </div>
                </div>

            </div>

        </Card>
    )
}
