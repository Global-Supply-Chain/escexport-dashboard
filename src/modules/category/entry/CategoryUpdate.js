import React, { useCallback, useEffect, useState } from 'react'
import { categoryPayload } from '../categoryPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { categoryService } from '../categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { formBuilder } from '../../../helpers/formBuilder';

const CategoryUpdate = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState([]);
    const [payload, setPayload] = useState(categoryPayload.update);
    const [appType, setAppType] = useState([]);
    const { category } = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingData = useCallback(async () => {
        setLoading(true);

        const appTypeResult = await getRequest(`${endpoints.status}?type=apptype`);
        if(appTypeResult.status === 200) {
            setAppType(appTypeResult.data.apptype);
        }

        await categoryService.show(dispatch, params.id);

        setLoading(false);
    }, [dispatch, params.id]);

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])

    useEffect(() => {
        if (category) {
            setPayload(category)
        }
    }, [category])

    const submitUpdateCategory = async () => {
        setLoading(true);
        const formData = formBuilder(payload, categoryPayload.update);
        await categoryService.update(dispatch, payload?.id, formData);
        setLoading(false);
    }

    return (
        <Card
            title="Category Update"
            subTitle="Category is purposing for item"
        >
            <Loading loading={loading} />

            <div className=' grid'>
                <div className=' col-12 md:col-3 lg:col-3 mt-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'> Name </label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            aria-describedby="title-help"
                            tooltip='Category name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter category name'
                            disabled={loading}
                            value={payload.name ? payload.name : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"name"} />
                    </div>
                </div>

                <div className="col-12 md:col-3 lg:col-3 mt-3">
                    <label htmlFor="password" className='input-label'> Description </label>
                    <div className="p-inputgroup mt-2">
                        <InputText
                            id="description"
                            className="p-inputtext-sm"
                            aria-describedby="description-help"
                            type="description"
                            placeholder="Enter description"
                            value={payload.description ? payload.description : ""}
                            tooltip="Category description"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'description', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>
                    <ValidationMessage field="description" />
                </div>

                <div className="col-12 md:col-3 lg:col-3 mt-3">
                    <label htmlFor="icon" className='input-label'> Icon </label>
                    <div className="p-inputgroup mt-2">
                        <InputText
                            type='file'
                            id="icon"
                            className="p-inputtext-sm"
                            aria-describedby="title-help"
                            tooltip="Category icon"
                            tooltipOptions={{ ...tooltipOptions }}
                            disabled={loading}
                            onChange={(e) => payloadHandler(payload, e.target.files[0], 'icon', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                    </div>
                    <ValidationMessage field="icon" />
                </div>

                <div className="col-12 md:col-3 lg:col-3 mt-3">
                    <label htmlFor="appType" className='input-label'> App Type </label>
                    <div className="p-inputgroup mt-2">
                        <Dropdown
                            inputId="role"
                            name="role"
                            autoComplete="admin role"
                            value={payload.app_type}
                            placeholder='Choose App Type'
                            onChange={(e) => payloadHandler(payload, e.value, 'app_type', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            options={appType}
                            disabled={loading}
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="app_type" />
                </div>

                <div className=' col-12 md:col-3 lg:col-3 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="phone" className='text-black'>Status</label>
                        <Dropdown
                            options={status}
                            placeholder="Select a general status"
                            disabled={loading}
                            value={payload.status}
                            className="p-inputtext-sm"
                            onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />

                        <ValidationMessage field={"status"} />
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
                            onClick={() => navigate(paths.category)}
                        />

                        <Button
                            className="mx-2"
                            label="UPDATE"
                            severity="danger"
                            size='small'
                            disabled={loading}
                            onClick={() => submitUpdateCategory()}
                        />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default CategoryUpdate;