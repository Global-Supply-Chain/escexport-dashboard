import React, { useCallback, useEffect, useRef, useState } from 'react'
import { itemPayload } from '../itemPayload';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import { payloadHandler } from '../../../helpers/handler';
import { paths } from '../../../constants/paths';
import { itemService } from '../itemService';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { Column } from 'primereact/column';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { FileUpload } from 'primereact/fileupload';
import { Badge } from 'primereact/badge';
import { AppEditor } from '../../../shares/AppEditor';
import { DataTable } from 'primereact/datatable';
import { DeleteConfirm } from '../../../shares/DeleteConfirm';
import { FormMainAction } from '../../../shares/FormMainAction';

const ItemUpdate = () => {

    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [status, setStatus] = useState([]);
    const [payload, setPayload] = useState(itemPayload.update);
    let [currentImage, setCurrentImage] = useState(payload.images);
    const [rmImage, setRmImage] = useState([]);
    const [content, setContent] = useState('');
    const fileUploadRef = useRef();
    const [selectPhoto, setSelectPhoto] = useState([]);

    const { item } = useSelector((state) => state.item);
    const { translate } = useSelector(state => state.setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onTemplateSelect = (e) => {
        setSelectPhoto(e.files);
    };

    const onTemplateRemove = (file, callback) => {
        let updateSelectPhoto = selectPhoto.filter(
            (value) => value.name !== file.name
        );
        setSelectPhoto(updateSelectPhoto);
        callback();
    };

    const onTemplateClear = () => {
        setSelectPhoto([]);
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i
                    className="pi pi-image mt-3 p-5"
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span
                    style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
                    className="my-5"
                >
                    {translate.drag_and_drop}
                </span>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-top flex-wrap">
                <div className="flex align-items-top" style={{ width: "40%" }}>
                    <img
                        alt={file.name}
                        role="presentation"
                        src={file.objectURL}
                        width={100}
                    />
                    <span className="flex flex-column gap-2 text-left ml-3">
                        {file.name}
                    </span>
                </div>
                <div className=" flex align-items-top gap-3">
                    <Badge value={props.formatSize}></Badge>
                </div>
                <Button
                    type="button"
                    icon="pi pi-times"
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto"
                    onClick={() => onTemplateRemove(file, props.onRemove)}
                />
            </div>
        );
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, cancelButton } = options;
        return (
            <div
                className={className}
                style={{
                    backgroundColor: "transparent",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {chooseButton}
                {cancelButton}
            </div>
        );
    };

    const chooseOptions = {
        icon: "pi pi-fw pi-images",
        iconOnly: true,
        className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
        icon: "pi pi-fw pi-times",
        iconOnly: true,
        className:
            "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };

    const imageBodyTemplate = (value) => {
        return <img src={`${endpoints.image}/${value}`} className="w-6rem shadow-2 border-round" />
    }

    const imageActionTemplate = (value) => {
        return (
            <Button
                size='small'
                severity='danger'
                outlined
                onClick={() => {
                    rmImage.push(currentImage.filter((image) => image === value)[0]);
                    setCurrentImage(currentImage.filter((image) => image !== value))
                }}
            >
                <i className=' pi pi-trash'></i>
            </Button>
        )
    }

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
        const result = await getRequest(
            `${endpoints.category}?filter=status,value=ACTIVE`
        );
        if (result.status === 200) {
            const formatData = result.data?.map((category) => {
                return {
                    label: category?.title,
                    value: category?.id,
                };
            });
            setCategoryList(formatData);
        }
        setLoading(false);
    }, [dispatch, params]);

    /**
    * Loading Category Data
    */
    const loadingShopData = useCallback(async () => {
        setLoading(true);

        const result = await getRequest(
            `${endpoints.shop}?filter=status,value=ACTIVE`
        );
        if (result.status === 200) {
            const formatData = result.data?.map((shop) => {
                return {
                    label: shop?.name,
                    value: shop?.id,
                };
            });
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

    useEffect(() => {
        setCurrentImage(payload.images)
    }, [payload.images])

    /**
     * update item
     * payload [category_id,name,code,description,price,sell_price,out_of_stock,content,status]
     * @returns
     * **/
    const submitItemUpdate = async () => {
        setLoading(true);
        const {
            category_id,
            out_of_stock,
            shop_id,
            name,
            description,
            code,
            instock,
            price,
            sell_price,
        } = payload;

        const formData = new FormData();
        console.log(selectPhoto);
        // selectPhoto.map((value, index) => {

        //     formData.append(`images[${index}]`, value);
        //     return value;
        // });

        currentImage = currentImage.concat(selectPhoto);

        formData.append("content", content);
        formData.append("category_id", category_id);
        formData.append(
            "out_of_stock",
            out_of_stock === "true" ? Number(0) : Number(1)
        );
        formData.append("sell_price", sell_price);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("code", code);
        formData.append("instock", instock);
        formData.append("name", name);
        formData.append("shop_id", shop_id);
        formData.append("method", "PUT");

        console.log(currentImage);
        
        // await itemService.update(dispatch, payload?.id, payload)
        setLoading(false);
    }



    return (
        <Card
            title={translate.item_update}
            subTitle={translate.item_subtitle}
        >
            <Loading loading={loading} />

            <div className=' grid'>

                <DeleteConfirm
                    url={paths.item}
                    id={params?.id}
                    redirect={paths.item}
                />

                <div className=' col-12'>
                    <DataTable
                        value={currentImage}
                        tableStyle={{ minWidth: '60rem' }}
                    >
                        <Column field='image' header="Image" body={imageBodyTemplate}></Column>
                        <Column field='image' header="Action" body={imageActionTemplate}></Column>
                    </DataTable>
                </div>

                <div className=" col-12">
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

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="category" className='input-label'> {translate.category} (required*) </label>
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

                <div className="col-12 md:col-4 lg:col-4 py-3">
                    <label htmlFor="shop" className='input-label'> {translate.shop} (required*) </label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="name" className=' text-black'>{translate.name} (required*)</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="code" className=' text-black'>{translate.code} (required*)</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="description" className=' text-black'>{translate.description}</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="price" className=' text-black'>{translate.price}</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="sell_price" className=' text-black'>{translate.sell_price} (required*)</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="instock" className=' text-black'>{translate.instock} (required*)</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="out_of_stock" className=' text-black'>{translate.outstock}</label>
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

                <div className=' col-12 md:col-6 lg:col-4 py-3'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="status" className=' text-black'>{translate.status}</label>
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

                <div className=' col-12 py-3'>
                    <div className="flex flex-column gap-2">
                        <span className=' text-black'>{translate.content}</span>
                        <AppEditor value={payload.content} onChange={(e) => setContent(e)} />
                        <ValidationMessage field={"content"} />
                    </div>
                </div>

                <FormMainAction
                    cancel={translate.cancel}
                    onCancel={() => navigate(paths.item)}
                    submit={translate.update}
                    onSubmit={submitItemUpdate}
                    loading={loading}
                />

            </div>

        </Card>
    )
}

export default ItemUpdate