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
import { Loading } from '../../../shares/Loading'
import { FormMainAction } from '../../../shares/FormMainAction'
import { countryService } from '../../country/countryService'
import { regionAndStateService } from '../../regionAndState/regionAndStateService'
import { cityService } from '../../city/cityService'
import { townshipService } from '../../township/townshipService'
import { AppEditor } from '../../../shares/AppEditor'
import { ImageUpload } from '../../../shares/ImageUpload'
import { Thumbnail } from '../../../shares/Thumbnail'
import { formBuilder } from '../../../helpers/formBuilder'
import { getRequest } from '../../../helpers/api'
import { endpoints } from '../../../constants/endpoints'

const filterStatus = {
    filter: "status",
    value: "ACTIVE"
}

export const CreateShop = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(shopPayload.create);
    const [countryList, setCountry] = useState([]);
    const [regionList, setRegionList] = useState([]);
    const [cityList, setCity] = useState([]);
    const [townshipList, setTownship] = useState([]);
    const [desc, setDesc] = useState();
    const [appType, setAppType] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { translate } = useSelector(state => state.setting);


    /** 
     * Loading country data 
     * */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const country = await countryService.index(dispatch, filterStatus);
        if (country.status === 200) {
            const formatData = country.data?.map((country) => {
                return {
                    label: country?.name,
                    value: country?.id
                }
            })
            setCountry(formatData);
        }

        const region = await regionAndStateService.index(dispatch, filterStatus);
        if (region.status === 200) {
            const formatData = region.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setRegionList(formatData);
        }

        const city = await cityService.index(dispatch, filterStatus);
        if (city.status === 200) {
            const formatData = city.data?.map((city) => {
                return {
                    label: city?.name,
                    value: city?.id
                }
            })
            setCity(formatData);
        }

        const township = await townshipService.index(dispatch, filterStatus);
        if (township.status === 200) {
            const formatData = township.data?.map((township) => {
                return {
                    label: township?.name,
                    value: township?.id
                }
            })
            setTownship(formatData);
        }

        const appTypeStatus = await getRequest(`${endpoints.status}?type=apptype`);
        if (appTypeStatus.status === 200) {
            setAppType(appTypeStatus.data.apptype);
        };

        setLoading(false);

    }, [dispatch])


    const submitShopCreate = async () => {
        setLoading(true);
        const updatePayload = { ...payload };
        updatePayload.description = desc;
        const form = formBuilder(updatePayload, shopPayload.create)
        await shopService.store(form, dispatch);
        setLoading(false);
    }

    useEffect(() => {
        loadingData()
    }, [loadingData])

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

                        <div className='col-12 flex align-items-center justify-content-center'>
                            <div className='w-full flex flex-column justify-content-center align-items-center'>
                                <ImageUpload
                                    preview={payload.shop_logo ? payload.shop_logo.image : null}
                                    onSelect={(e) => payloadHandler(payload, e, 'shop_logo', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={'shop_logo'} />
                            </div>
                        </div>

                        <div className=" col-12">
                            <h3 className=" thumbnail-title">{translate.cover_photo}</h3>
                            <Thumbnail
                                preview={payload.cover_photo ? payload.cover_photo.image : null}
                                onSelect={(e) => payloadHandler(payload, e, 'cover_photo', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                            />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="country" className='input-label text-black'>{translate.country} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='country'
                                    autoComplete='country name'
                                    name='country'
                                    filter
                                    value={payload.country_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'country_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={countryList}
                                    placeholder="Select a country"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="region_or_state_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="region" className='input-label text-black'>{translate.region} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='region'
                                    autoComplete='region name'
                                    name='region'
                                    filter
                                    value={payload.region_or_state_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'region_or_state_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={regionList}
                                    placeholder="Select a region"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="region_or_state_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="city" className='input-label text-black'>{translate.city} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='city'
                                    autoComplete='city name'
                                    name='city'
                                    filter
                                    value={payload.city_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'city_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={cityList}
                                    placeholder="Select a city"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="city_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="township" className='input-label text-black'>{translate.township} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='township'
                                    autoComplete='township name'
                                    name='township'
                                    filter
                                    value={payload.township_id}
                                    onChange={(e) => payloadHandler(payload, e.value, 'township_id', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={townshipList}
                                    placeholder="Select a township"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="township_id" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
                            <label htmlFor="apptype" className='input-label text-black'>{translate.township} <span>(required*)</span> </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='apptype'
                                    autoComplete='app type name'
                                    name='app type'
                                    filter
                                    value={payload.app_type}
                                    onChange={(e) => payloadHandler(payload, e.value, 'app_type', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                    options={appType}
                                    placeholder="Select a app type"
                                    disabled={loading}
                                    className="p-inputtext-sm"
                                />
                            </div>
                            <ValidationMessage field="app_type" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
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

                        <div className="col-12 md:col-4 lg:col-4 py-3">
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

                        <div className=" col-12 md:col-6 lg:col-4 py-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="email" className=" text-black"> {translate.email} <span> (required*) </span></label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    keyfilter={"email"}
                                    id="email"
                                    name="email"
                                    aria-describedby="email-help"
                                    tooltip={translate.email}
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder={translate.email}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, "email", (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"email"} />
                            </div>
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 py-3">
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

                        <div className=' col-12 md:col-6 lg:col-4 py-3'>
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

                        <div className=" col-12 py-3">
                            <div className="flex flex-column gap-2">
                                <span className=" text-black">{translate.description} </span>
                                <AppEditor onChange={(e) => setDesc(e)} />
                                <ValidationMessage field={"description"} />
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
