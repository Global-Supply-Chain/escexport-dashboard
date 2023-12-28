import React, { useCallback, useEffect, useState } from 'react'
import { tooltipOptions } from '../../../constants/config';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { pointService } from '../pointSerivce';
import { pointPayload } from '../pointPayload';
import { paths } from '../../../constants/paths';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { endpoints } from '../../../constants/endpoints';
import { getRequest } from '../../../helpers/api';
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../../shares/Loading';

const PointCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(pointPayload.create);
    const [pointLabelStatus, setPointLabelStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);

    const submitCreatePoint = async () => {
        setLoading(true);
        await pointService.store(payload, dispatch);
        setLoading(false);
    }

    const loadingPointLabelStatus = useCallback(async () => {

        const response = await getRequest(`${endpoints.status}?type=${endpoints.point}`);

        if (response) {

            const formateData = response.data.point?.map((item) => {
                return {
                    label: item,
                    value: item
                }
            })

            setPointLabelStatus(formateData);
        }

    }, []);

    useEffect(() => {
        loadingPointLabelStatus()
    }, [loadingPointLabelStatus])


    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>

                <Card
                    title={translate.point_create}
                    subTitle={translate.point_subtitle}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="label" className=' text-black'>{translate.label}</label>
                                <Dropdown
                                    inputId='label'
                                    name='label'
                                    autoComplete='label'
                                    options={pointLabelStatus}
                                    placeholder="Select a point label"
                                    disabled={loading}
                                    value={payload.label}
                                    className="p-inputtext-sm text-black"
                                    onChange={(e) => payloadHandler(payload, e.value, 'label', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />

                                <ValidationMessage field={"status"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="point" className=' text-black'>{translate.point}</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="point"
                                    name="point"
                                    autoComplete='point'
                                    keyfilter={'num'}
                                    aria-describedby="point-help"
                                    tooltip='point'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter point'
                                    disabled={loading}
                                    rows={5}
                                    cols={30}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'point', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"point"} />
                            </div>
                        </div>

                        <div className=' md:col-12 mx-2 md:mx-0 my-3'>
                            <div className=' flex align-items-center justify-content-end'>
                                <div className=' flex align-items-center justify-content-between gap-3'>

                                    <Button
                                        label={translate.cancel}
                                        severity="secondary"
                                        outlined
                                        size='small'
                                        onClick={() => navigate(paths.point)}
                                    />

                                    <Button
                                        severity="danger"
                                        size='small'
                                        disabled={loading}
                                        label={translate.submit}
                                        onClick={() => submitCreatePoint()}
                                    />

                                </div>
                            </div>
                        </div>

                    </div>

                </Card>

            </div>

        </div>
    )
}

export default PointCreate