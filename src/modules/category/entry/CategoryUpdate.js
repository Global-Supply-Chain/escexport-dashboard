import React, { useCallback, useEffect, useState } from 'react'
import { categoryPayload } from '../categoryPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Button } from 'primereact/button';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { categoryService } from '../categoryService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CategoryUpdate = ({ dataSource }) => {

    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayload.update);
    const [categoryList, setCategoryList] = useState([{ label: categoryPayload.update.title, code: categoryPayload.update.id }]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingDataSource = useCallback(() => {
        if (dataSource) {
            setPayload(dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        loadingDataSource();
    }, [loadingDataSource])


    /**
    * Loading Data
    */
    const loadingData = useCallback(async () => {
        setLoading(true);

        const result = await categoryService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((category) => {
                return {
                    label: category?.title,
                    value: category?.id
                } 
            })
            console.log(formatData);
            setCategoryList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingData()
    }, [loadingData])

    const submitUpdateCategory = async () => {
        setLoading(true);
        await categoryService.update(dispatch,payload?.id,payload)
        setLoading(false);
    }


    return (
        <Card
            title="Category Update"
            subTitle="Category is purposing for item"
        >
            <div className=' grid'>

                <div className=' col-12 flex align-items-center justify-content-end'>
                    <div>

                        <DeleteDialogButton
                            visible={visible}
                            setVisible={setVisible}
                            url={paths.category}
                            id={dataSource?.id}
                        />

                        <Button
                            size='small'
                            severity='danger'
                            onClick={() => setVisible(true)}
                        >
                            <i className=' pi pi-trash'></i>
                        </Button>
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="title" className=' text-black'>Title</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="title"
                            aria-describedby="title-help"
                            tooltip='Category title'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter category title'
                            disabled={loading}
                            value={payload.title ? payload.title : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"title"} />
                    </div>
                </div>

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="email" className='input-label'>Level</label>
                    <div className="p-inputgroup mt-2">
                        <InputText
                            id="level"
                            className="p-inputtext-sm"
                            keyfilter={'int'}
                            aria-describedby="level-help"
                            placeholder="Enter category level"
                            value={payload.level ? payload.level : ""}
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
                    payload.category_id && (
                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="phone" className='input-label'> Category </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    value={payload.category_id ? payload.category_id : ""}
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
                            onClick={() => submitUpdateCategory()}
                        />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default CategoryUpdate