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
import { regionAndStatePayload } from '../regionAndStatePayload';
import { regionAndStateService } from '../regionAndStateService';
import { countryService } from '../../country/countryService';
import { Dropdown } from 'primereact/dropdown';

export const RegionAndStateCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionAndStatePayload.create);
    const [countryList, setCountryList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

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

    useEffect(() => {
        loadingCountryData()
    }, [loadingCountryData])

    const submitRegionAndStateCreate = async () => {
        setLoading(true);
        const response = await regionAndStateService.store(payload, dispatch);
        if(response.data){
            navigate(`${paths.regionAndState}/${response.data.id}`);
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
                        title={translate.region_and_state_create}

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
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.regionAndState)}
                                submit={translate.submit}
                                onSubmit={submitRegionAndStateCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
