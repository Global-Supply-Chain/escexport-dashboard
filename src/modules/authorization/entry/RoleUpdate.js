import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { authorizationPayload } from '../authorizationPayload';
import { Loading } from '../../../shares/Loading';
import { paths } from '../../../constants/paths';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { Card } from 'primereact/card';
import { authorizationService } from '../authorizatonService';
import { MultiSelect } from 'primereact/multiselect';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Checkbox } from 'primereact/checkbox';

const formatMultiSelect = (value, preValue) => {
    const permissionFormat = value?.map((per) => {
        let id = [];
        if (per?.id) {
            id.push(...id, per?.id);
        }
        if (per?.code) {
            id.push(...id, per?.code);
        }
        return id?.flat();
    });

    const concetPreValue = preValue?.map((per) => {
        let id = [];
        id.push(per.id)
        return id;
    });

    const result = permissionFormat.concat(concetPreValue);
    const final = result.flat()?.filter((value, index, self) => self.indexOf(value) === index);

    return final;

}

export const RoleUpdate = ({ dataSource, callback }) => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(authorizationPayload.updateRole);
    const [isMerchant, setIsMerchant] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { translate } = useSelector(state => state.setting);

    /**
     * update role
     * @returns
     * 
     * **/
    const submitUpdateRole = async () => {
        setLoading(true);
        const permissionFormat = formatMultiSelect(payload?.permissions, dataSource?.role.permissions)
        const mainPayload = {
            name: payload.name,
            description: payload.description,
            is_merchant: isMerchant,
            permissions: permissionFormat
        }

        await authorizationService.roleUpdate(dispatch, dataSource.id, mainPayload);
        callback()
        setLoading(false);
    }


    useEffect(() => {
        if (dataSource) {
            setPayload(dataSource?.role)
            setIsMerchant(dataSource?.is_merchant)
        }
    }, [dataSource])

    return (
        <Card
            title={translate.role_update}
        >

            <Loading loading={loading} />

            <div className=' grid'>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="name" className='input-label'>{translate.name}</label>
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
                            autoComplete='Role name'
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>
                    <ValidationMessage field="name" />
                </div>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="description" className='input-label'>{translate.description}</label>
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

                <div className=" col-12 md:col-6 lg:col-4 py-3">
                    <div className="flex flex-row align-items-center h-full gap-2">
                        <Checkbox
                            className="p-inputtext-sm text-black"
                            inputId="is_merchant"
                            name="is merchant"
                            autoComplete="is merchant"
                            aria-describedby="is merchant help"
                            tooltip="Member is merchant"
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder="Enter member is merchant"
                            disabled={loading}
                            checked={isMerchant ? isMerchant : ''}
                            onChange={(e) => {
                                setIsMerchant(e.checked);
                            }
                            }
                        />
                        <label htmlFor="is_merchant" className=" text-black">
                            {translate.is_merchant}
                        </label>
                        <ValidationMessage field={"is_merchant"} />
                    </div>
                </div>

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor='permission' className='input-label'> {translate.permission} </label>
                    <div className="p-inputgroup mt-2">
                        <MultiSelect
                            inputId='permission'
                            value={payload ? payload?.permissions : null}
                            onChange={(e) => {
                                payloadHandler(payload, e.value, 'permissions', (updateValue) => {
                                    setPayload(updateValue);
                                })
                            }}
                            filter
                            display="chip"
                            optionLabel="name"
                            options={dataSource ? dataSource?.permissionList : null}
                            placeholder="Select a permission"
                            disabled={loading}
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="permissions" />
                </div>

                <FormMainAction
                    cancel={translate.cancel}
                    onCancel={() => navigate(paths.role)}
                    submit={translate.update}
                    onSubmit={submitUpdateRole}
                    loading={loading}
                />

            </div>

        </Card>
    )
}
