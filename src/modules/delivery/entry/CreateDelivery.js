import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { ValidationMessage } from '../../../shares/ValidationMessage'
import { payloadHandler } from '../../../helpers/handler'
import { deliveryPayload } from '../deliveryPayload'
import { userService } from '../../user/userService'
import { useDispatch } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { tooltipOptions } from '../../../constants/config';
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { paths } from '../../../constants/paths'
import { useNavigate } from 'react-router-dom'
import { deliveryService } from '../deliveryService'
import { Loading } from '../../../shares/Loading'

export const CreateDelivery = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(deliveryPayload.create);
    const [userList, setUserList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
    * Loading User Data
    */
    const loadingUserData = useCallback(async () => {
        setLoading(true);

        const result = await userService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((user) => {
                return {
                    label: user?.name,
                    value: user?.id
                }
            })
            setUserList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    const submitDeliveryCreate = async () => {
        setLoading(true);
        await deliveryService.store(payload,dispatch);
        setLoading(false);
    }

    useEffect(() => {
        loadingUserData()
    }, [loadingUserData])

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>

                <Card
                    title={'Create Delivery'}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="user" className='input-label'> User (required*) </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='user'
                                    name="user"
                                    autoComplete='user'
                                    value={payload.user_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'user_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={userList}
                                    placeholder="Select a user"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="user_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="address" className='input-label'>Address</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    name="address"
                                    autoComplete='address'
                                    className="p-inputtext-sm"
                                    placeholder="Enter delivery address"
                                    value={payload.address}
                                    aria-describedby="address-help"
                                    tooltip="Delivery Address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="address" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="phone" className='input-label'>Contact Phone</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="phone"
                                    name='phone'
                                    autoComplete='phone'
                                    className="p-inputtext-sm"
                                    placeholder="Enter contact phone"
                                    value={payload.contact_phone}
                                    aria-describedby="address-help"
                                    tooltip="Contact Phone"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'contact_phone', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="contact_phone" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="person" className='input-label'>Contact Person</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="person"
                                    name="person"
                                    autoComplete='person'
                                    className="p-inputtext-sm"
                                    placeholder="Enter contact person"
                                    value={payload.contact_person}
                                    aria-describedby="address-help"
                                    tooltip="Contact Person"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'contact_person', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="contact_person" />
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="is_default" className=' text-black'>Default</label>
                                <Checkbox
                                    className="p-inputtext-sm text-black"
                                    inputId="is_default"
                                    name="default"
                                    autoComplete='default'
                                    aria-describedby="is_default-help"
                                    tooltip='Item sell price'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter item sell price'
                                    disabled={loading}
                                    checked={payload.is_default}
                                    onChange={(e) => payloadHandler(payload, e.checked, 'is_default', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"is_default"} />
                            </div>
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
                                    onClick={() => navigate(paths.delivery)}
                                />

                                <Button
                                    className="mx-2"
                                    label="CREATE"
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    onClick={() => submitDeliveryCreate()}
                                />
                            </div>
                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}
