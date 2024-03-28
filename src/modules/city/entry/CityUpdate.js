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
import { cityPayload } from '../cityPayload';
import { cityService } from '../cityService';
import { regionAndStateService } from '../../regionAndState/regionAndStateService';

export const CityUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(cityPayload.update);
    const [status, setStatus] = useState([]);
    const [regionAndState, setRegionAndState] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { translate } = useSelector(state => state.setting);
    const { city } = useSelector(state => state.city);

    /**
    * Loading region Data
    */
    const loadingRegionAndStateData = useCallback(async () => {
        setLoading(true);

        const result = await regionAndStateService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setRegionAndState(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingRegionAndStateData()
    }, [loadingRegionAndStateData])

    const loadingData = useCallback(async () => {
        setLoading(true);
        await cityService.show(dispatch, params.id);
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
        if (city) {
            setPayload(city)
        }
    }, [city])

    const submitCityUpdate = async () => {
        setLoading(true);
        const form = formBuilder(payload, cityPayload.update)
        await cityService.update(dispatch, params.id, form);
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
                        title={translate.city_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="country" className='input-label'>{translate.country} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='region_or_state_id'
                                        autoComplete='region_or_state_id'
                                        name='region or state id'
                                        filter
                                        value={payload.region_or_state_id}
                                        onChange={(e) => payloadHandler(payload, e.value, 'region_or_state_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={regionAndState}
                                        placeholder="Select a region or state"
                                        disabled={loading}
                                        className="p-inputtext-sm"
                                    />
                                </div>
                                <ValidationMessage field="country_id" />
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
