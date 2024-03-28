import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { countryPayload } from '../countryPayload';
import { countryService } from '../countryService';
import { Thumbnail } from '../../../shares/Thumbnail';
import { formBuilder } from '../../../helpers/formBuilder';

export const CountryUpdate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(countryPayload.update);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { translate } = useSelector(state => state.setting);
    const { country } = useSelector(state => state.country);

    const submitCountryCreate = async () => {
        setLoading(true);
        const form = formBuilder(payload, countryPayload.update);
        await countryService.update(dispatch,params.id,form);
        setLoading(false);
    }

    const lodaingData = useCallback(async () => {
        setLoading(true);
        await countryService.show(dispatch, params.id);
        setLoading(false);
    }, [params.id]);

    useEffect(() => {
        lodaingData();
    }, [lodaingData])

    useEffect(() => {
        if(country) {
            setPayload(country);
        }
    }, [country])

    return (
        <>

            <div className=' grid'>

                <div className=' col-12'>
                    <Card
                        title={translate.country_update}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className=' col-12'>

                                <Thumbnail
                                    preview={payload.flag_image ? payload.flag_image.image : null}
                                    onSelect={(e) => payloadHandler(payload, e, 'flag_image', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"flag_image"} />

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
                                        value={payload.name ? payload.name : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"name"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="code" className=' text-black'>{translate.country_code} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="code"
                                        name="code"
                                        autoComplete='code'
                                        aria-describedby="code-help"
                                        tooltip='Country Code'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter country code'
                                        disabled={loading}
                                        value={payload.country_code ? payload.country_code : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'country_code', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"country_code"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 py-3'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="mobile_prefix" className=' text-black'>{translate.mobile_prefix} (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="mobile_prefix"
                                        name="mobile_prefix"
                                        autoComplete='mobile_prefix'
                                        aria-describedby="mobile_prefix-help"
                                        tooltip='mobile number prefix'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter mobile prefix'
                                        disabled={loading}
                                        value={payload.mobile_prefix ? payload.mobile_prefix : ""}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'mobile_prefix', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"mobile_prefix"} />
                                </div>
                            </div>

                            <FormMainAction
                                cancel={translate.cancel}
                                onCancel={() => navigate(paths.country)}
                                submit={translate.submit}
                                onSubmit={submitCountryCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
