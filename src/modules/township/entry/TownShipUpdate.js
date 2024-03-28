import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { Dropdown } from 'primereact/dropdown';
import { generalStatus } from '../../../helpers/StatusHandler';
import { formBuilder } from '../../../helpers/formBuilder';
import { cityService } from '../../city/cityService';
import { townshipService } from '../townshipService';
import { townshipPayload } from '../townshipPayload';

export const TownShipUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(townshipPayload.update);
    const [status, setStatus] = useState([]);
    const [cityList, setCity] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { translate } = useSelector(state => state.setting);
    const { township } = useSelector(state => state.township);

    /**
    * Loading region Data
    */
    const loadingCityData = useCallback(async () => {
        setLoading(true);

        const result = await cityService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setCity(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingCityData()
    }, [loadingCityData])

    const loadingData = useCallback(async () => {
        setLoading(true);
        await townshipService.show(dispatch, params.id);
        setLoading(false);
    }, [params.id, dispatch])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        if (township) {
            setPayload(township)
        }
    }, [township])

    const submitCityUpdate = async () => {
        setLoading(true);
        const form = formBuilder(payload, townshipPayload.update)
        await townshipService.update(dispatch, params.id, form);
        setLoading(false);
    }

    return (
        <>

            <div className=' grid'>
                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={translate.township_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="city" className='input-label'>{translate.city} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='city_id'
                                        autoComplete='city_id'
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


                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>{translate.name} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
                                        name="name"
                                        autoComplete='name'
                                        aria-describedby="name-help"
                                        tooltip='Region name'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter region name'
                                        disabled={loading}
                                        value={payload?.name ? payload.name : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-3 lg:col-3 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="phone" className='text-black'>Status</label>
                                    <Dropdown
                                        options={status}
                                        placeholder="Select a general status"
                                        disabled={loading}
                                        value={payload.status}
                                        className="p-inputtext-sm"
                                        onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />

                                    <ValidationMessage field={"status"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.city)}
                                submit={translate.submit}
                                onSubmit={submitCityUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
