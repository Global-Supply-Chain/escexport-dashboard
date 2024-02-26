import React, { useCallback, useEffect, useState } from 'react'
import { BreadCrumb } from '../../../shares/BreadCrumb'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { ValidationMessage } from '../../../shares/ValidationMessage'
import { payloadHandler } from '../../../helpers/handler'
import { useDispatch, useSelector } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths'
import { useNavigate } from 'react-router-dom'
import { shopService } from '../shopService'
import { shopPayload } from '../shopPayload'
import { regionService } from '../../region/regionService'
import { Loading } from '../../../shares/Loading'
import { FormMainAction } from '../../../shares/FormMainAction'

export const CreateShop = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(shopPayload.create);
    const [regionList, setRegionList] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { translate } = useSelector(state => state.setting);

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

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>

                <Card
                    title={translate.shop_create}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="region" className='input-label'>{translate.region} (required*) </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='region'
                                    autoComplete='region name'
                                    name='region'
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
                            <label htmlFor="name" className='input-label'>{translate.name}</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="name"
                                    name='name'
                                    autoComplete='name'
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
                            <label htmlFor="phone" className='input-label'>{translate.phone}</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="phone"
                                    name='phone'
                                    autoComplete='phone'
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
                            <label htmlFor="address" className='input-label'>{translate.address}</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="address"
                                    name='address'
                                    autoComplete='address'
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
                                <label htmlFor="location" className=' text-black'>{translate.location}</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="location"
                                    name="locaiton"
                                    autoComplete='location'
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

                        <FormMainAction 
                            cancel={translate.cancel}
                            onCancel={() => navigate(paths.shop)}
                            submit={translate.submit}
                            onSubmit={submitShopCreate}
                            loading={loading}
                        />

                    </div>

                </Card>

            </div>

        </div>
    )
}
