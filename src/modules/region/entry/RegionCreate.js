import React, { useState } from 'react'
import { regionPayload } from '../regionPayload';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { regionService } from '../regionService';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { BreadCrumb } from '../../../shares/BreadCrumb';

export const RegionCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionPayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                        title={'Create Region'}

                    >

                        <div className=' grid'>


                            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="name" className=' text-black'>Name (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="name"
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

                            <div className="col-12">
                                <div className="flex flex-row justify-content-end align-items-center">
                                    <Button
                                        className="mx-2"
                                        label="CANCEL"
                                        severity="secondary"
                                        outlined
                                        size='small'
                                        disabled={loading}
                                        onClick={() => navigate(paths.region)}
                                    />

                                    <Button
                                        className="mx-2"
                                        label="CREATE"
                                        severity="danger"
                                        size='small'
                                        disabled={loading}
                                        onClick={submitRegionCreate}
                                    />
                                </div>
                            </div>

                        </div>

                    </Card>
                </div>
            </div>

        </>
    )
}