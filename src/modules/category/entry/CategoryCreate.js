import React, { useCallback, useEffect, useRef, useState } from 'react'
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

const CategoryCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayload.create);
    const [categoryList, setCategoryList] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const categoryList = useRef(state.category);

    const submitCategoryCreate = async () => {
        setLoading(true);
        const result = await categoryService.store(payload, dispatch);

        if(result.status === 200){

            categoryList.push({
                label : result.data?.title,
                value : result.data?.id
            })

            setCategoryList(categoryList);
        }

        setLoading(false);
    }

    /**
    * Loading Data
    */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await categoryService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((category) => {
                return {
                    label : category?.title,
                    value : category?.id
                }
            })
            setCategoryList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

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
                    <div className="grid">
                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="name" className='input-label'>Title</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="title"
                                    className="p-inputtext-sm"
                                    placeholder="Enter category title"
                                    value={payload.title}
                                    aria-describedby="title-help"
                                    tooltip="Category title"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="title" />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3">
                            <label htmlFor="email" className='input-label'>Level</label>
                            <div className="p-inputgroup mt-2">
                                <InputText
                                    id="level"
                                    className="p-inputtext-sm"
                                    keyfilter={'int'}
                                    aria-describedby="level-help"
                                    placeholder="Enter category level"
                                    value={payload.level}
                                    tooltip="Category level"
                                    tooltipOptions={{ ...tooltipOptions }}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'level', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                            </div>
                            <ValidationMessage field="level" />
                        </div>

                        {
                            categoryList?.length > 0 && (
                                <div className="col-12 md:col-4 lg:col-4 my-3">
                                <label htmlFor="phone" className='input-label'> Category </label>
                                <div className="p-inputgroup mt-2">
                                <Dropdown 
                                value={payload.category_id} 
                                onChange={(e) => payloadHandler(payload, e.value, 'category_id', (updateValue) => {
                                    setPayload(updateValue);
                                })}
                                options={categoryList} 
                                placeholder="Select a category" 
                                disabled={loading}
                                className="p-inputtext-sm" 
                                />
                                </div>
                                <ValidationMessage field="phone" />
                            </div>
                            )
                        }

                        <div className="col-12 md:col-4 lg:col-4 my-3">
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