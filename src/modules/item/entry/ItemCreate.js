import { Card } from 'primereact/card'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { categoryService } from '../../category/categoryService';
import { useDispatch } from 'react-redux';
import { itemPayload } from '../itemPayload';
import { Dropdown } from 'primereact/dropdown';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { useNavigate } from 'react-router-dom';
import { itemService } from '../itemService';
import { mediaService } from '../../media/mediaService';
import { endpoints } from '../../../constants/endpoints';
import { Galleria } from 'primereact/galleria';
import { Editor } from 'primereact/editor';
import { renderHeader } from '../../../constants/config';
import { responsiveOptions } from '../../../constants/config';
import { itemTemplate } from '../../../constants/config';
import { thumbnailTemplate } from '../../../constants/config';
import { Loading } from '../../../shares/Loading';

const ItemCreate = () => {

    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [payload, setPayload] = useState(itemPayload.create);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mediaList, setMediaList] = useState([])

    const mediaRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const header = renderHeader();

    /**
     * Create item
     * payload [category_id,name,code,description,content,price,sell_price,out_of_stock]
     * **/
    const submitItemCreate = async () => {
        setLoading(false);
        await itemService.store(dispatch, payload);
        setLoading(false);
    }

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

        setLoading(false);
    }, [dispatch]);

    useEffect(() => {
        loadingCategoryData()
    }, [loadingCategoryData])

    /**
     * loading image list
     * **/
    const loadingImageData = useCallback(async () => {
        setLoading(true);
        const result = await mediaService.list(dispatch);
        if (result.status === 200) {
            const formatData = result.data?.map((img, index) => {
                return {
                    itemImageSrc: `${endpoints.image}/${img.id}`,
                    thumbnailImageSrc: `${endpoints.image}/${img.id}`,
                    alt: 'GSC Export',
                    title: 'Title 1',
                    id: img?.id,
                    index: index
                }
            })
            setMediaList(formatData);
        }
        setLoading(false);
    }, [dispatch]);

    /**
     * handle gallery payload
     * **/
    const filterPayload = useCallback((value, index) => {
        if (value) {
            const filter = value?.filter(img => img.index === index);
            console.log(filter);
        }
    }, [])

    useEffect(() => {
        loadingImageData()
    }, [loadingImageData])


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
                    <Loading loading={loading} />

                    <div className=' grid'>

                        <div className=' col-12'>
                            <div className=' flex align-items-center justify-content-center'>
                                <Galleria
                                    ref={mediaRef}
                                    value={mediaList}
                                    activeIndex={activeIndex}
                                    onItemChange={(e) => {
                                        setActiveIndex(e.index);
                                        filterPayload(mediaRef.current.props.value, e.index);
                                    }}
                                    responsiveOptions={responsiveOptions}
                                    numVisible={5}
                                    item={itemTemplate}
                                    // onClick={(e) => filterPayload(mediaRef.current.props.value)}
                                    thumbnail={thumbnailTemplate}
                                    style={{ maxWidth: '640px', minHeight: '471px' }}
                                />
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
                                    tooltipOptions={{ ...tooltipOptions }}
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

                        <div className=' col-12 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="content" className=' text-black'>Content</label>
                                <Editor
                                    id='editor'
                                    headerTemplate={header}
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