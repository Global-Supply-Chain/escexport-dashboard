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
import { townshipPayload } from '../townshipPayload';
import { cityService } from '../../city/cityService';
import { townshipService } from '../townshipService';

export const TownShipCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(townshipPayload.create);
    const [city, setCity] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    /**
    * Loading region Data
    */
    const loadingRegionAndStateData = useCallback(async () => {
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
        loadingRegionAndStateData()
    }, [loadingRegionAndStateData])

    const submitTownshipCreate = async () => {
        setLoading(true);
        const response = await townshipService.store(payload, dispatch);
        if(response.data){
            navigate(`${paths.township}/${response.data.id}`);
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
                        title={translate.township_create}
                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className="col-12 md:col-4 lg:col-4 py-3">
                                <label htmlFor="city_id" className='input-label'>{translate.city} (required*) </label>
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
                                        options={city}
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
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.township)}
                                submit={translate.submit}
                                onSubmit={submitTownshipCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
