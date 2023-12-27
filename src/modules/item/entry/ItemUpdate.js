import React, { useCallback, useEffect, useState } from 'react'
import { itemPayload } from '../itemPayload';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { categoryService } from '../../category/categoryService';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { renderHeader, tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import { payloadHandler } from '../../../helpers/handler';
import { paths } from '../../../constants/paths';
import { itemService } from '../itemService';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { Editor } from 'primereact/editor';
import { shopService } from '../../shop/shopService';

const ItemUpdate = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [status, setStatus] = useState([]);
    const [visible, setVisible] = useState(false);
    const [payload, setPayload] = useState(itemPayload.update);

    const { item } = useSelector((state) => state.item);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const header = renderHeader();

    /**
    * Return general status
    * @returns {Array} Array that contain general status ACTIVE,DISABLE and DELETE
    * **/
    useEffect(() => {
        generalStatus().then((data) => {
            setStatus(data)
        }).catch((error) => console.log(error))

    }, [])


    /**
    * Loading Category Data
    */
    const loadingCategoryData = useCallback(async () => {
        setLoading(true);
        const result = await categoryService.mainIndex(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((category) => {
                return {
                    label: category?.title,
                    value: category?.id
                }
            })
            setCategoryList(formatData);
        }

        await itemService.show(dispatch, params.id)
        setLoading(false);
    }, [dispatch, params]);

    /**
    * Loading Category Data
    */
    const loadingShopData = useCallback(async () => {
        setLoading(true);

        const result = await shopService.index(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((shop) => {
                return {
                    label: shop?.name,
                    value: shop?.id
                }
            })
            setShopList(formatData);
        }

        setLoading(false);
    }, [dispatch]);

    /**
     *  Loading Old Data
     * **/
    const loadingData = useCallback(async () => {
        setLoading(true);
        itemService.show(dispatch, params.id)
        setLoading(false);
    }, [dispatch, params])

    useEffect(() => {
        loadingData()
    }, [loadingData])

    useEffect(() => {
        loadingShopData()
    }, [loadingShopData])

    useEffect(() => {
        loadingCategoryData()
    }, [loadingCategoryData])

    useEffect(() => {
        if (item) {
            setPayload(item)
        }
    }, [item])

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
            <Loading loading={loading} />

            <div className=' grid'>

                <div className=' col-12 flex align-items-center justify-content-end'>
                    <div>

                        <DeleteDialogButton
                            visible={visible}
                            setVisible={setVisible}
                            url={paths.item}
                            id={params?.id}
                            redirect={paths.item}
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
                    <label htmlFor="category" className='input-label'> Category (required*) </label>
                    <div className="p-inputgroup mt-2">
                        <Dropdown
                            inputId='category'
                            name="category"
                            autoComplete='item category'
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

                <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                    <label htmlFor="shop" className='input-label'> Shop (required*) </label>
                    <div className="p-inputgroup mt-2">
                        <Dropdown
                            inputId='shop'
                            name="shop item"
                            autoComplete='shop item'
                            value={payload.shop_id}
                            onChange={(e) => payloadHandler(payload, e.value, 'shop_id', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            options={shopList}
                            placeholder="Select a shop"
                            disabled={loading}
                            className="p-inputtext-sm"
                        />
                    </div>
                    <ValidationMessage field="shop_id" />
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>Name (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="name"
                            name='name'
                            autoComplete='item name'
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
                    <div className="flex flex-column gap-2">
                        <label htmlFor="instock" className=' text-black'>Instock (required*)</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="instock"
                            name="item instcok"
                            autoComplete='item instock'
                            aria-describedby="instock-help"
                            tooltip='Item instock'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter item instock'
                            disabled={loading}
                            rows={5}
                            cols={30}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'instock', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"instock"} />
                    </div>
                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="out_of_stock" className=' text-black'>Out of stock</label>
                        <Checkbox
                            className="p-inputtext-sm text-black"
                            inputId="out_of_stock"
                            name="out of stock"
                            autoComplete='out of stock'
                            aria-describedby="out_of_stock-help"
                            tooltip='Item sell price'
                            tooltipOptions={{ ...tooltipOptions }}
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

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="status" className=' text-black'>Status</label>
                        <Dropdown
                            inputId='status'
                            name="status"
                            autoComplete='item status'
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

                <div className=' col-12 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <span className=' text-black'>Content</span>
                        <Editor
                            headerTemplate={header}
                            value={payload.content}
                            onTextChange={(e) => payloadHandler(payload, e.htmlValue, 'content', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            style={{ height: '320px' }}
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