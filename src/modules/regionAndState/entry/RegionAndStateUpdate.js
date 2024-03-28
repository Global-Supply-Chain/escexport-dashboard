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
import { regionAndStatePayload } from '../regionAndStatePayload';
import { regionAndStateService } from '../regionAndStateService';
import { countryService } from '../../country/countryService';
import { Dropdown } from 'primereact/dropdown';
import { generalStatus } from '../../../helpers/StatusHandler';
import { formBuilder } from '../../../helpers/formBuilder';

export const RegionAndStateUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionAndStatePayload.update);
    const [status, setStatus] = useState([]);
    const [countryList, setCountryList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { translate } = useSelector(state => state.setting);
    const { regionAndState } = useSelector(state => state.regionAndState);

    /**
    * Loading region Data
    */
    const loadingCountryData = useCallback(async () => {
        setLoading(true);

        const result = await countryService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((region) => {
                return {
                    label: region?.name,
                    value: region?.id
                }
            })
            setCountryList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    const loadingData = useCallback(async () => {
        setLoading(true);
        await regionAndStateService.show(dispatch,params.id);
        setLoading(false);
    }, [params.id, dispatch])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        loadingCountryData()
    }, [loadingCountryData])

    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        if(regionAndState){
            setPayload(regionAndState)
        }
    }, [regionAndState])

    const submitRegionAndStateUpdate = async () => {
        setLoading(true);
        const form = formBuilder(payload, regionAndStatePayload.update)
        await regionAndStateService.update(dispatch,params.id, form);
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
                        title={translate.region_and_state_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="country" className='input-label'>{translate.country} (required*) </label>
                                <div className="p-inputgroup mt-2">
                                    <Dropdown
                                        inputId='country'
                                        autoComplete='country name'
                                        name='country'
                                        filter
                                        value={payload.country_id ? payload.country_id : ''}
                                        onChange={(e) => payloadHandler(payload, e.value, 'country_id', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                        options={countryList}
                                        placeholder="Select a country"
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
                                onCancel={() => navigate(paths.regionAndState)}
                                submit={translate.submit}
                                onSubmit={submitRegionAndStateUpdate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
