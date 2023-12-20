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
import { Editor } from 'primereact/editor';
import { renderHeader } from '../../../constants/config';
import { Loading } from '../../../shares/Loading';
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from 'primereact/progressbar';
import { Badge } from 'primereact/badge';
import { uploadFile } from '../../../helpers/uploadFile';
import { shopService } from '../../shop/shopService';

const ItemCreate = () => {

    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [payload, setPayload] = useState(itemPayload.create);
    const [selectPhoto, setSelectPhoto] = useState([]);
    const [isFeaturePhoto, setIsFeaturePhoto] = useState([]);
    const [checked, setChecked] = useState(false);
    const [mediaList, setMediaList] = useState([]);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const header = renderHeader();

    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;
        setSelectPhoto(files);
        setIsFeaturePhoto(files);

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };


    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };


    const onFeatureChange = (e) => {
        let _select = [...selectPhoto];

        // if (e.checked)
        //     _select.push(e.value);
        // else
        _select = _select.filter((select, index) => select.lastModified === e.value.lastModified);

        setIsFeaturePhoto(_select);
    };

    const itemTemplate = (file, props) => {

        const isFeature = isFeaturePhoto.some((item) => item.lastModified === file.lastModified);

        return (
            <div className="flex align-items-top flex-wrap"
            >
                <div className="flex align-items-top" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-column gap-2 text-left ml-3">
                        {file.name}
                        <Checkbox
                            name="feature"
                            value={file}
                            onChange={onFeatureChange}
                            checked={isFeature}
                        />
                    </span>
                </div>
                <div className=' flex align-items-top gap-3'>
                    <Badge value={props.formatSize}></Badge>
                </div>
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

    /**
     * Create item
     * payload [category_id,name,code,description,content,price,sell_price,out_of_stock]
     * **/
    const submitItemCreate = async () => {
        setLoading(false);
        await itemService.store(dispatch, payload);
        setLoading(false);
    }

    const submitImage = async () => {
        setLoading(false);
        const fetchMedia = async () => {
            checked?.map(async (img) => {
                const result = await uploadFile.image(dispatch, img.id, 'ITEM_IMAGE');
                if (result.status === 200) {
                    setMediaList((prev) => [...prev, {
                        id: result.data.id,
                        is_feature: img.is_feature
                    }])
                }
            })
        }

        fetchMedia();
        setLoading(false);
    }

    const handleItemClick = async () => {
        await submitImage();
      };

    useEffect(() => {
        if(mediaList.length > 0){
            payloadHandler(payload, mediaList, 'image', (updateValue) => {
                setPayload(updateValue);
            });
            submitItemCreate();
        }
    }, [mediaList])

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

    useEffect(() => {
        loadingShopData()
    }, [loadingShopData])

    useEffect(() => {
        loadingCategoryData()
    }, [loadingCategoryData])

    useEffect(() => {

        const format = selectPhoto?.map((select) => {
            if (select.lastModified === isFeaturePhoto[0].lastModified) {
                return {
                    id: select,
                    is_feature: true
                }
            } else {
                return {
                    id: select,
                    is_feature: false
                }
            }
        })

        setChecked(format)

    }, [selectPhoto, isFeaturePhoto])

    console.log(payload);

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
                            <FileUpload
                                ref={fileUploadRef}
                                multiple
                                accept="image/*"
                                maxFileSize={1000000}
                                onSelect={onTemplateSelect}
                                onError={onTemplateClear}
                                onClear={onTemplateClear}
                                headerTemplate={headerTemplate}
                                itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                chooseOptions={chooseOptions}
                                cancelOptions={cancelOptions}
                            />
                        </div>

                        <div className="col-12 md:col-4 lg:col-4 my-3 md:my-0">
                            <label htmlFor="category" className='input-label'> Category (required*) </label>
                            <div className="p-inputgroup mt-2">
                                <Dropdown
                                    inputId='category'
                                    name="item category"
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
                                    name="name"
                                    autoComplete='item name'
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
                                    name="code"
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
                                    name="description"
                                    autoComplete='item description'
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
                                    name="price"
                                    autoComplete='item price'
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
                                    name="item sell price"
                                    autoComplete='item sell price'
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

                        <div className=' col-12 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <span className=' text-black'>Content</span>
                                <Editor
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
                                        onClick={handleItemClick}
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