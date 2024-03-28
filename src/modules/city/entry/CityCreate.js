import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
import { cityPayload } from '../cityPayload';
import { cityService } from '../cityService';
import { regionAndStateService } from '../../regionAndState/regionAndStateService';

export const CityCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(cityPayload.create);
    const [regionAndState, setRegionAndState] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

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

    const submitCityCreate = async () => {
        setLoading(true);
        const response = await cityService.store(payload, dispatch);
        if(response.data){
            navigate(`${paths.city}/${response.data.id}`);
        }
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
                        title={translate.city_create}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="region_or_state_id" className='input-label'>{translate.country} (required*) </label>
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
                                <ValidationMessage field="region_or_state_id" />
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
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.city)}
                                submit={translate.submit}
                                onSubmit={submitCityCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
