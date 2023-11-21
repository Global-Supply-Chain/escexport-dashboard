import { Card } from 'primereact/card'
import React, { useCallback, useEffect, useState } from 'react'
import { categoryService } from '../../category/categoryService';
import { useDispatch } from 'react-redux';
import { itemPayload } from '../itemPayload';
import { Dropdown } from 'primereact/dropdown';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../itemService';

const ItemCreate = () => {

    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [payload, setPayload] = useState(itemPayload.create);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Create item
     * payload [category_id,name,code,description,content,price,sell_price,out_of_stock]
     * **/
    const submitItemCreate = async () => {
        setLoading(false);

        const result = await itemService.store(dispatch,payload);

        setLoading(false);
    }

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

    return (
        <div className=' grid'>

            <div className=' col-12'>
                <BreadCrumb />
            </div>

            <div className='col-12'>

                <Card
                    title={'Create Item'}
                    subTitle="Item is purposing for order management"
                >

                    <div className=' grid'>

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
                                        tooltipOptions={{...tooltipOptions}}
                                        placeholder='Enter item sell price'
                                        disabled={loading}
                                        rows={5} 
                                        cols={30}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'sell_price', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"sell_price"} />
                                </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="out_of_stock" className=' text-black'>Out of stock</label>
                                    <Checkbox
                                        className="p-inputtext-sm text-black"
                                        id="out_of_stock"
                                        aria-describedby="out_of_stock-help"
                                        tooltip='Item sell price'
                                        tooltipOptions={{...tooltipOptions}}
                                        placeholder='Enter item sell price'
                                        disabled={loading}
                                        checked={payload.out_of_stock}
                                        onChange={(e) => payloadHandler(payload, e.checked, 'out_of_stock', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"out_of_stock"} />
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
                                            label="SUBMIT"
                                            onClick={() => submitItemCreate()}
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

export default ItemCreate