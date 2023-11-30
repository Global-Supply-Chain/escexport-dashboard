import React, { useCallback, useEffect, useState } from 'react'
import { tooltipOptions } from '../../../constants/config';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
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
import DeleteDialogButton from '../../../shares/DeleteDialogButton';

const PointUpdate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(pointPayload.update);
    const [pointLabelStatus, setPointLabelStatus] = useState([]);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
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
                    title={'Create Point'}
                    subTitle="Point is purposing for reward point"
                >

                    <div className=' grid'>

                        <div className=' col-12 flex align-items-center justify-content-end'>
                            <div>

                                <DeleteDialogButton
                                    visible={visible}
                                    setVisible={setVisible}
                                    url={paths.point}
                                    id={params?.id}
                                    redirect={paths.point}
                                />

                                <Button
                                    size='small'
                                    severity='danger'
                                    outlined
                                    onClick={() => setVisible(true)}
                                >
                                    <i className=' pi pi-trash'></i>
                                </Button>
                            </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="label" className=' text-black'>Label</label>
                                <Dropdown
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
                                <label htmlFor="point" className=' text-black'>Point</label>
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

                        <div className=' md:col-12 mx-2 md:mx-0 my-3'>
                            <div className=' flex align-items-center justify-content-end'>
                                <div className=' flex align-items-center justify-content-between gap-3'>

                                    <Button
                                        label="CANCEL"
                                        severity="secondary"
                                        outlined
                                        size='small'
                                        onClick={() => navigate(paths.point)}
                                    />

                                    <Button
                                        severity="danger"
                                        size='small'
                                        disabled={loading}
                                        label="UPDATE"
                                        onClick={() => submitUpdatePoint()}
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

export default PointUpdate