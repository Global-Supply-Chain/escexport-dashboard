import React, { useCallback, useEffect, useState } from 'react'
import { regionPayload } from '../regionPayload';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { endpoints } from '../../../constants/endpoints';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { payloadHandler } from '../../../helpers/handler';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { regionService } from '../regionService';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';
import { generalStatus } from '../../../helpers/StatusHandler';

export const RegionUpdate = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionPayload.update);
    const [status, setStatus] = useState([]);
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { region } = useSelector((state) => state.region);

    const loadingData = useCallback(async () => {
        setLoading(true)
        await regionService.show(dispatch, params.id)
        setLoading(false)
    }, [dispatch, params])

    /**
    * Return general status
    * @returns {Array} Array that contain general status ACTIVE,DISABLE and DELETE
    * **/
    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        loadingData();
    }, [loadingData])

    useEffect(() => {
        if (region) {
            setPayload(region)
        }
    }, [region])


    const submitRegionUpdate = async () => {
        setLoading(true);
        await regionService.update(dispatch, params.id, payload);
        setLoading(false);
    }

    return (
        <Card
            title={'Update Region'}
        >

            <div className=' grid'>

                <div className=' col-12 flex align-items-center justify-content-end'>
                    <div>

                        <DeleteDialogButton
                            visible={visible}
                            setVisible={setVisible}
                            url={endpoints.region}
                            id={params.id}
                            redirect={paths.region}
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
                        <label htmlFor="phone" className=' text-black'>Status</label>
                        <Dropdown
                            options={status}
                            placeholder="Select a general status"
                            disabled={loading}
                            value={payload.status}
                            className="p-inputtext-sm text-black"
                            onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />

                        <ValidationMessage field={"status"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>Name (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            aria-describedby="name-help"
                            tooltip='Region name'
                            value={payload.name ? payload.name : ""}
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
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={submitRegionUpdate}
                        />
                    </div>
                </div>

            </div>

        </Card>
    )
}
