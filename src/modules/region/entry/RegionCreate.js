import React, { useState } from 'react'
import { regionPayload } from '../regionPayload';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { regionService } from '../regionService';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';

export const RegionCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionPayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    const submitRegionCreate = async () => {
        setLoading(true);
        await regionService.store(payload, dispatch);
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
                        title={translate.region_create}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>


                            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
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
                                onCancel={() => navigate(paths.region)}
                                submit={translate.submit}
                                onSubmit={submitRegionCreate}
                                loading={loading}
                            />

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}
