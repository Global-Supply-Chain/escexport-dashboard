import { Card } from "primereact/card";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemPayload } from "../itemPayload";
import { Dropdown } from "primereact/dropdown";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { InputText } from "primereact/inputtext";
import { tooltipOptions } from "../../../constants/config";
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from "primereact/button";
import { paths } from "../../../constants/paths";
import { useNavigate, useParams } from "react-router-dom";
import { itemService } from "../itemService";
import { Loading } from "../../../shares/Loading";
import { FileUpload } from "primereact/fileupload";
import { Badge } from "primereact/badge";
import { AppEditor } from "../../../shares/AppEditor";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { FormMainAction } from "../../../shares/FormMainAction";
import { Thumbnail } from "../../../shares/Thumbnail";
import { MultiSelect } from 'primereact/multiselect';

const itemSizes = [
  {
    name: "X SMALL",
    code: "xs"
  },
  {
    name: "SMALL",
    code: "sm"
  },
  {
    name: "MEDIUM",
    code: "md"
  },
  {
    name: "X LARGE",
    code: "xl"
  },
  {
    name: "2X LARGE",
    code: "2xl"
  },
  {
    name: "3X LARGE",
    code: "3xl"
  },
  {
    name: "4X LARGE",
    code: "4xl"
  }
]

const ItemUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [shopList, setShopList] = useState([]);
  const [payload, setPayload] = useState(itemPayload.create);
  const [content, setContent] = useState("");
  const [selectPhoto, setSelectPhoto] = useState([]);
  const [pickColor, setPickColor] = useState([]);
  const fileUploadRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { item } = useSelector(state => state.item);
  const { translate } = useSelector(state => state.setting);

  const onTemplateSelect = useCallback((e) => {
        setSelectPhoto(e.files);
  }, [payload.product_photo]);

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

  const countryTemplate = (option) => {
    return (
      <div style={{
        width: '30px',
        height: '30px',
        borderRadius: '10px',
        backgroundColor: `#${option?.code}`
      }}>
      </div>
    );
  };

  const panelFooterTemplate = () => {
    const length = payload.item_color ? payload.item_color.length : 0;

    return (
      <div className="py-2 px-3">
        <b>{length}</b> item{length > 1 ? 's' : ''} selected.
      </div>
    );
  };

  /**
   * Create item
   * payload [category_id,name,code,description,content,price,sell_price]
   * **/
  const handleItemClick = async () => {
    setLoading(false);
    const {
      category_id,
      shop_id,
      name,
      thumbnail_photo,
      product_photo,
      item_code,
      item_color,
      item_size,
      description,
      code,
      instock,
      price,
      sell_price,
    } = payload;

    const formData = new FormData();

    const filterColor = payload.item_color.map((color) => {
      return color.code
    })

    const filterSize = payload.item_size.map((size) => {
      return size.code;
    })

    selectPhoto.map((value, index) => {
      formData.append(`product_photo[${index}]`, value);
      return value;
    });

    filterColor.map((value, index) => {
      formData.append(`item_color[${index}]`, value);
    });

    filterSize.map((value, index) => {
      formData.append(`item_size[${index}]`, value);
    });

    formData.append("thumbnail_photo", thumbnail_photo);
    formData.append("item_code", item_code);
    formData.append("content", content);
    formData.append("category_id", category_id);
    formData.append("sell_price", sell_price);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("code", code);
    formData.append("instock", instock);
    formData.append("name", name);
    formData.append("shop_id", shop_id);

    await itemService.store(dispatch, formData);
    setLoading(false);
  };

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
          label: category?.name,
          value: category?.id,
        };
      });
      setCategoryList(formatData);
    }
    setLoading(false);
  }, []);

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
  }, []);

  const loadingData = useCallback(async () => {
    setLoading(true);
    await itemService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id])

  useEffect(() => {
    loadingShopData();
  }, [loadingShopData]);

  useEffect(() => {
    loadingCategoryData();
  }, [loadingCategoryData]);

  useEffect(() => {
    loadingData()
  }, [loadingData])

  useEffect(() => {
    if(item){
        setPayload(item);
    }
  }, [item])

  console.log(payload);

  return (
    <div className=" grid">

      <div className="col-12">
        <Card
          title={translate.item_update}
          subTitle={translate.item_subtitle}
        >
          <Loading loading={loading} />

          <div className=" grid">

            <div className=" col-12">
              <h3 className=" thumbnail-title">{translate.thumbnail_photo}</h3>
              <Thumbnail
                preview={payload.thumbnail_photo ? payload.thumbnail_photo.image : null}
                onSelect={(e) => payloadHandler(payload, e, 'thumbnail_photo', (updateValue) => {
                  setPayload(updateValue);
                })}
              />
            </div>

            <div className=" col-12">
              <h3 className=" thumbnail-title">{translate.product_photo}</h3>
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
              <label htmlFor="category" className="input-label">
                {translate.category} (required*)
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  inputId="category"
                  name="item category"
                  filter
                  autoComplete="item category"
                  value={payload.category_id}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "category_id",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  options={categoryList}
                  placeholder="Select a category"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="category_id" />
            </div>

            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor="shop" className="input-label">
                {translate.shop} (required*)
              </label>
              <div className="p-inputgroup mt-2">
                <Dropdown
                  inputId="shop"
                  name="shop item"
                  filter
                  autoComplete="shop item"
                  value={payload.shop_id}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.value,
                      "shop_id",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  options={shopList}
                  placeholder="Select a shop"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="shop_id" />
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="name" className=" text-black">
                  {translate.name} (required*)
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="name"
                  name="name"
                  autoComplete="item name"
                  aria-describedby="name-help"
                  tooltip="User full name"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter user name"
                  disabled={loading}
                  value={payload.name ? payload.name : ''}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"name"} />
              </div>
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="code" className=" text-black">
                  {translate.code} (required*)
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="code"
                  name="code"
                  aria-describedby="code-help"
                  tooltip="Item code"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter item code"
                  disabled={loading}
                  value={payload.item_code ? payload.item_code : ''}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "item_code",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"item_code"} />
              </div>
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="color" className=" text-black">
                  {translate.color}
                </label>
                <div className="p-inputgroup flex-1">
                  <ColorPicker
                    value={pickColor}
                    onChange={(e) => {
                      const newValue = e.value;
                      setPickColor(prevColor => [...prevColor, {
                        name: newValue,
                        code: newValue
                      }]);
                    }}
                  />
                  <MultiSelect
                    className="p-inputtext-sm text-black"
                    id="color"
                    name="color"
                    optionLabel="name"
                    autoComplete="item color"
                    aria-describedby="color-help"
                    tooltip="Item color"
                    options={pickColor}
                    itemTemplate={countryTemplate}
                    panelFooterTemplate={panelFooterTemplate}
                    filter
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder="Enter item color"
                    disabled={loading}
                    value={payload.item_color ? payload.item_color : ''}
                    onChange={(e) => {
                      console.log(e.target.value)
                      payloadHandler(
                        payload,
                        e.target.value,
                        "item_color",
                        (updateValue) => {
                          setPayload(updateValue);
                        }
                      )
                    }
                    }
                  />
                </div>
                <ValidationMessage field={"item_color"} />
              </div>
            </div>

            <div className="col-12 md:col-4 lg:col-4 py-3">
              <label htmlFor='size' className='input-label'> {translate.size} </label>
              <div className="p-inputgroup mt-2">
                <MultiSelect
                  inputId='size'
                  value={payload ? payload.item_size : null}
                  onChange={(e) => {
                    payloadHandler(payload, e.value, 'item_size', (updateValue) => {
                      setPayload(updateValue);
                    })
                  }}
                  filter
                  optionLabel="name"
                  options={itemSizes}
                  placeholder="Select a item size"
                  disabled={loading}
                  className="p-inputtext-sm"
                />
              </div>
              <ValidationMessage field="item_size" />
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="description" className=" text-black">
                  {translate.description}
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="description"
                  name="description"
                  autoComplete="item description"
                  aria-describedby="description-help"
                  tooltip="Item description"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter item description"
                  disabled={loading}
                  rows={5}
                  cols={30}
                  value={payload.description ? payload.description : ''}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "description",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"description"} />
              </div>
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="price" className=" text-black">
                  {translate.price}
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="price"
                  name="price"
                  autoComplete="item price"
                  keyfilter={"num"}
                  aria-describedby="price-help"
                  tooltip="Item price"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter item price"
                  disabled={loading}
                  value={payload.price ? payload.price : ''}
                  rows={5}
                  cols={30}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "price",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"price"} />
              </div>
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="sell_price" className=" text-black">
                  {translate.sell_price} (required*)
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="sell_price"
                  name="item sell price"
                  autoComplete="item sell price"
                  aria-describedby="sell_price-help"
                  tooltip="Item sell price"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter item sell price"
                  disabled={loading}
                  rows={5}
                  cols={30}
                  value={payload.sell_price ? payload.sell_price : ''}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "sell_price",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"sell_price"} />
              </div>
            </div>

            <div className=" col-12 md:col-6 lg:col-4 py-3">
              <div className="flex flex-column gap-2">
                <label htmlFor="instock" className=" text-black">
                  {translate.instock} (required*)
                </label>
                <InputText
                  className="p-inputtext-sm text-black"
                  id="instock"
                  name="item instcok"
                  autoComplete="item instock"
                  aria-describedby="instock-help"
                  tooltip="Item instock"
                  tooltipOptions={{ ...tooltipOptions }}
                  placeholder="Enter item instock"
                  disabled={loading}
                  value={payload.instock ? payload.instock : ''}
                  rows={5}
                  cols={30}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "instock",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                />
                <ValidationMessage field={"instock"} />
              </div>
            </div>

            <div className=" col-12 py-3">
              <div className="flex flex-column gap-2">
                <span className=" text-black">{translate.content} </span>
                <AppEditor value={payload.content ? payload.content : ''} onChange={(e) => setContent(e)} />
                <ValidationMessage field={"content"} />
              </div>
            </div>

            <FormMainAction
              cancel={translate.cancel}
              onCancel={() => navigate(paths.item)}
              submit={translate.submit}
              onSubmit={handleItemClick}
              loading={loading}
            />


          </div>
        </Card>
      </div>
    </div>
  );
};

export default ItemUpdate;
