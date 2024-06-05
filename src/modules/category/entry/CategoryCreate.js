import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { categoryPayload } from '../categoryPayload';
import { categoryService } from '../categoryService';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../../shares/Loading';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { formBuilder } from '../../../helpers/formBuilder';

const CategoryCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayload.create);
    const [appType, setAppType] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitCategoryCreate = async () => {
        setLoading(true);
        
        const formData = formBuilder(payload, categoryPayload.create);
        const result = await categoryService.store(formData, dispatch);

        if (result.status === 200) {
            navigate(`${paths.category}/${result.data.id}`);
        }

        setLoading(false);
    }

    /**
    * Loading Data
    */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await getRequest(`${endpoints.status}?type=apptype`);
        if (result.status === 200) {
            setAppType(result.data.apptype);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        loadingData()
    }, [loadingData])

    return (
        <div className='grid'>

            <div className='col-12'>
                <BreadCrumb />
            </div>

            <div className=' col-12'>
                <Card
                    title="Create Category"
                    subTitle="Category is purposing for item"
                >

                    <Loading loading={loading} />

                    <div className="grid">
                        <div className="col-12 md:col-3 lg:col-3 mt-3">
                            <label htmlFor="name" className='input-label'> Name </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="name"
                                    className="p-inputtext-sm"
                                    placeholder="Enter category name"
                                    value={payload.name}
                                    aria-describedby="title-help"
                                    tooltip="Category name"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="name" />
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

                        <div className="col-12 md:col-3 lg:col-3 mt-3">
                            <label htmlFor="password" className='input-label'> Description </label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="description"
                                    className="p-inputtext-sm"
                                    aria-describedby="description-help"
                                    type="description"
                                    placeholder="Enter description"
                                    value={payload.description}
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

                        <div className="col-12 mt-3">
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
                                    label="CREATE"
                                    severity="danger"
                                    size='small'
                                    disabled={loading}
                                    onClick={() => submitCategoryCreate()}
                                />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

        </div>
    )
}

export default CategoryCreate