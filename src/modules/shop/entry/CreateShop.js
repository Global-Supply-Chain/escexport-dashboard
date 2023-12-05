import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { ValidationMessage } from '../../../shares/ValidationMessage'
import { payloadHandler } from '../../../helpers/handler'
import { useDispatch } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { tooltipOptions } from '../../../constants/config';
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { paths } from '../../../constants/paths'
import { useNavigate } from 'react-router-dom'
import { shopService } from '../shopService'
import { shopPayload } from '../shopPayload'
import { regionService } from '../../region/regionService'
import { Loading } from '../../../shares/Loading'

export const CreateShop = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(shopPayload.create);
    const [regionList, setRegionList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
    * Loading region Data
    */
    const loadingRegionData = useCallback(async () => {
        setLoading(true);

        const result = await regionService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setRegionList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    const submitShopCreate = async () => {
        setLoading(true);
        await shopService.store(payload,dispatch);
        setLoading(false);
    }

    useEffect(() => {
        loadingRegionData()
    }, [loadingRegionData])

    console.log(regionList);

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>

                <Card
                    title={'Create Shop'}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="region_id" className='input-label'> Region (required*) </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    id='region_id'
                                    value={payload.region_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'region_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={regionList}
                                    placeholder="Select a region"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="region_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="name" className='input-label'>Name</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter shop name"
                                    value={payload.name}
                                    aria-describedby="name-help"
                                    tooltip="Shop name"
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
                            <label htmlFor="phone" className='input-label'>Phone</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="phone"
                                    className="p-inputtext-sm"
                                    placeholder="Enter shop phone"
                                    value={payload.phone}
                                    aria-describedby="phone-help"
                                    tooltip="Shop Phone"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'phone', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="phone" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="address" className='input-label'>Address</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    className="p-inputtext-sm"
                                    placeholder="Enter shop address"
                                    value={payload.address}
                                    aria-describedby="address-help"
                                    tooltip="Shop address"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'address', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="address" />
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="location" className=' text-black'>Location</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="location"
                                    aria-describedby="location-help"
                                    tooltip='Shop location'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter shop location'
                                    disabled={loading}
                                    value={payload.location}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'location', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"location"} />
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
                                    onClick={() => navigate(paths.shop)}
                                />

                                <Button
                                    className="mx-2"
                                    label="CREATE"
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    onClick={() => submitShopCreate()}
                                />
                            </div>
                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}
