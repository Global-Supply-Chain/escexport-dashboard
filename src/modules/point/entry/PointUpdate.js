import React, { useCallback, useEffect, useState } from 'react'
import { tooltipOptions } from '../../../constants/config';
import { Card } from 'primereact/card';
import { useNavigate, useParams } from 'react-router-dom';
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
import { FormMainAction } from '../../../shares/FormMainAction';
import { DeleteConfirm } from '../../../shares/DeleteConfirm';

const PointUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(pointPayload.update);
    const [pointLabelStatus, setPointLabelStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { translate } = useSelector(state => state.setting);
    const params = useParams();

    const { point } = useSelector(state => state.point);

    const submitUpdatePoint = async () => {
        setLoading(true);
        await pointService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    const loadingPointLabelStatus = useCallback(async () => {

        const response = await getRequest(`${endpoints.status}?type=${endpoints.point}`);

        if (response.status === 200) {

            const formateData = response.data.point?.map((item) => {
                return {
                    label: item,
                    value: item
                }
            })

            setPointLabelStatus(formateData);
        }

        await pointService.show(dispatch, params.id);

    }, [dispatch, params.id]);

    useEffect(() => {
        loadingPointLabelStatus()
    }, [loadingPointLabelStatus])

    useEffect(() => {
        if (point) {
            setPayload(point);
        }
    }, [point])


    return (
        <div className=' grid'>

            <div className='col-12'>

                <Card
                    title={translate.point_update}
                    subTitle={translate.point_subtitle}
                >

                    <Loading loading={loading} />

                    <div className=' grid'>

                        <DeleteConfirm
                            url={paths.point}
                            id={params?.id}
                            redirect={paths.point}
                        />

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="label" className=' text-black'>{translate.label}</label>
                                <Dropdown
                                    inputId='label'
                                    name="label"
                                    autoComplete='label'
                                    options={pointLabelStatus}
                                    placeholder="Select a point label"
                                    disabled={loading}
                                    value={payload.label ? payload.label : ""}
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
                                    keyfilter={'num'}
                                    aria-describedby="point-help"
                                    tooltip='point'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter point'
                                    disabled={loading}
                                    rows={5}
                                    cols={30}
                                    value={payload.point ? payload.point : ""}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'point', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"point"} />
                            </div>
                        </div>

                        <FormMainAction
                            cancel={translate.cancel}
                            cancelClick={() => navigate(paths.point)}
                            submit={translate.update}
                            submitClick={submitUpdatePoint}
                            loading={loading}
                        />

                    </div>

                </Card>

            </div>

        </div>
    )
}

export default PointUpdate