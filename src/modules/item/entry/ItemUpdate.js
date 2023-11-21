import React, { useCallback, useEffect, useState } from 'react'
import { itemPayload } from '../itemPayload';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../../helpers/api';
import { categoryService } from '../../category/categoryService';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import { payloadHandler } from '../../../helpers/handler';
import { paths } from '../../../constants/paths';
import { itemService } from '../itemService';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';

const ItemUpdate = ({ dataSource }) => {

    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([{ label: itemPayload.update.title, code: itemPayload.update.id }]);
    const [generalStatus, setGeneralStatus] = useState([]);
    const [visible, setVisible] = useState(false);
    const [payload, setPayload] = useState(itemPayload.update);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loadingDataSource = useCallback(() => {
        if (dataSource) {
            setPayload(dataSource);
        }
    }, [dataSource]);

    const loadingGeneralStatus = useCallback(async () => {

        const response = await getRequest(`/status?type=general`);

        if (response) {

            const formateData = response.data.general?.map((item) => {
                return {
                    label: item,
                    value: item
                }
            })

            setGeneralStatus(formateData);
        }

    }, []);

    useEffect(() => {
        loadingGeneralStatus()
    }, [loadingGeneralStatus])

    useEffect(() => {
        loadingDataSource();
    }, [loadingDataSource])

    /**
    * Loading Category Data
    */
    const loadingCategoryData = useCallback(async () => {
        setLoading(true);

        const result = await categoryService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((category) => {
                return {
                    label: category?.title,
                    value: category?.id
                }
            })
            setCategoryList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingCategoryData()
    }, [loadingCategoryData])

    /**
     * update item
     * payload [category_id,name,code,description,price,sell_price,out_of_stock,content,status]
     * @returns
     * **/
    const submitItemUpdate = async () => {
        setLoading(true);
        await itemService.update(dispatch, payload?.id, payload)
        setLoading(false);
    }



    return (
        <Card
            title={'Update Item'}
            subTitle="Item is purposing for order management"
        >

            <div className=' grid'>

            <div className=' col-12 flex align-items-center justify-content-end'>
                    <div>

                        <DeleteDialogButton
                            visible={visible}
                            setVisible={setVisible}
                            url={paths.item}
                            id={dataSource?.id}
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

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="phone" className='input-label'> Category (required*) </label>
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
                    <ValidationMessage field="category_id" />
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>Name (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            aria-describedby="name-help"
                            tooltip='User full name'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter user name'
                            disabled={loading}
                            value={payload?.name ? payload?.name : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'name', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"name"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="code" className=' text-black'>Code (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="code"
                            aria-describedby="code-help"
                            tooltip='Item code'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item code'
                            disabled={loading}
                            value={payload?.code ? payload?.code : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'code', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"code"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="description" className=' text-black'>Description</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="description"
                            aria-describedby="description-help"
                            tooltip='Item description'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item description'
                            disabled={loading}
                            rows={5}
                            cols={30}
                            value={payload?.description ? payload?.description : ''}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'description', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"description"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="price" className=' text-black'>Price</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="price"
                            keyfilter={'num'}
                            aria-describedby="price-help"
                            tooltip='Item price'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item price'
                            disabled={loading}
                            rows={5}
                            cols={30}
                            value={payload?.price ? payload?.price : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'price', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"price"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="sell_price" className=' text-black'>Sell Price (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="sell_price"
                            aria-describedby="sell_price-help"
                            tooltip='Item sell price'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item sell price'
                            disabled={loading}
                            rows={5}
                            cols={30}
                            value={payload?.sell_price ? payload?.sell_price : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'sell_price', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"sell_price"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex align-items-center gap-2 h-100">
                        <Checkbox
                            className="p-inputtext-sm text-black"
                            id="out_of_stock"
                            name='Out of Stock'
                            aria-describedby="out_of_stock-help"
                            tooltip='Item sell price'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item sell price'
                            disabled={loading}
                            checked={payload?.out_of_stock === 1 ? true : false}
                            // value={payload.out_of_stock ? payload.out_of_stock : false}
                            onChange={(e) => payloadHandler(payload, e.checked, 'out_of_stock', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <label htmlFor="out_of_stock" className=' text-black'>Out of stock</label>
                    </div>
                    <ValidationMessage field={"out_of_stock"} />
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="phone" className=' text-black'>Status</label>
                        <Dropdown
                            options={generalStatus}
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

                <div className=' col-12 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="content" className=' text-black'>Content</label>
                        <InputTextarea
                            className="p-inputtext-sm text-black"
                            id="content"
                            aria-describedby="content-help"
                            tooltip='Item content'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item content'
                            disabled={loading}
                            rows={5}
                            cols={30}
                            value={payload?.content ? payload?.content : ''}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'content', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"content"} />
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
                                onClick={() => navigate(paths.item)}
                            />

                            <Button
                                severity="danger"
                                size='small'
                                disabled={loading}
                                label="UPDATE"
                                onClick={() => submitItemUpdate()}
                            />

                        </div>
                    </div>
                </div>

            </div>

        </Card>
    )
}

export default ItemUpdate