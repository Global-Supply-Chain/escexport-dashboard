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
import { paths } from '../../../constants/paths';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { FormMainAction } from '../../../shares/FormMainAction';
import { DeleteConfirm } from '../../../shares/DeleteConfirm';

export const RegionUpdate = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(regionPayload.update);
    const [status, setStatus] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { region } = useSelector((state) => state.region);
    const { translate } = useSelector(state => state.setting);

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
            title={translate.region_update}
        >
            <Loading loading={loading} />

            <div className=' grid'>

                <DeleteConfirm 
                    id={params.id}
                    url={endpoints.region}
                    redirect={paths.region}
                />

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>{translate.name} (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            name='name'
                            autoComplete='name'
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="status" className=' text-black'>{translate.status}</label>
                        <Dropdown
                            inputId='status'
                            name="status"
                            autoComplete='status'
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

                <FormMainAction 
                    cancel={translate.cancel}
                    onCancel={() => navigate(paths.region)}
                    submit={translate.update}
                    onSubmit={submitRegionUpdate}
                    loading={loading}
                />

            </div>

        </Card>
    )
}
