import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { promotionPayload } from "../promotionPayload";
import { promotionService } from "../promotionService";
import { useCallback, useEffect, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from '../../../constants/config';
import { Image } from "primereact/image";
import { Loading } from "../../../shares/Loading";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { FormMainAction } from "../../../shares/FormMainAction";
import { getRequest } from "../../../helpers/api";
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from "primereact/calendar";
import { formBuilder } from "../../../helpers/formBuilder";
import moment from "moment";

export const CreatePromotion = () => {

    const maxStartDate = new Date();

    const [payload, setPayload] = useState(promotionPayload.create);
    const [loading, setLoading] = useState(false);
    const [appType, setAppType] = useState([]);
    const [src, setSrc] = useState(null);

    const { translate } = useSelector(state => state.setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitPromotionCreate = async () => {
        setLoading(true);
        const updatePayload = { ...payload };
        updatePayload.start_date = moment(payload.start_date).format("YY-MM-DD");
        updatePayload.end_date = moment(payload.end_date).format("YY-MM-DD");
        const formData = formBuilder(updatePayload, promotionPayload.create);
        const result = await promotionService.store(formData, dispatch);

        if (result.status === 200) {
            navigate(`${paths.promotion}/${result.data.id}`);
        }
        setLoading(false);
    }

    const initLoading = useCallback(async () => {
        const result = await getRequest(`${endpoints.status}?type=apptype`);
        if (result.status === 200) {
            setAppType(result.data.apptype);
        }
    }, []);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <div className="grid">
            <div className="col-12">
                <BreadCrumb />
            </div>


            <div className="col-12">
                <Card
                    title={translate.promotion_create}
                >
                    <Loading loading={loading} />
                    <div className="grid">
                        <div className=' col-12 md:col-4 lg:col-4 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="title" className=' text-black'>{translate.title}</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="title"
                                    aria-describedby="title-help"
                                    tooltip={translate.title}
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder={translate.title}
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"title"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-2 lg:col-2 py-3'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="status" className='text-black'>{translate.app_type}</label>
                                <Dropdown
                                    inputId='status'
                                    name='status'
                                    className="p-inputtext-sm"
                                    options={appType}
                                    placeholder={translate.app_type}
                                    disabled={loading}
                                    value={payload.app_type}
                                    onChange={(e) => payloadHandler(payload, e.value, 'app_type', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"app_type"} />
                            </div>
                        </div>

                        <div className=" col-12 md:col-3 lg:col-3 py-3">
                            <div className=" flex flex-column gap-2">
                                <label htmlFor="start_date" className=' text-black'>{translate.promotion_start_date}</label>
                                <Calendar
                                    name="start_date"
                                    className="p-inputtext-sm md:mr-2 sm:w-full"
                                    placeholder={translate.promotion_start_date}
                                    selectionMode={"single"}
                                    disabled={loading}
                                    disabledDates={[new Date(), maxStartDate]}
                                    maxDate={maxStartDate}
                                    value={payload.start_date}
                                    onChange={async (e) => {
                                        payloadHandler(payload, e.target.value, 'start_date', (updateValue) => {
                                            setPayload(updateValue);
                                        });
                                    }}
                                />
                                <ValidationMessage field={"start_date"} />
                            </div>
                        </div>


                        <div className="col-12 md:col-3 lg:col-3 py-3">
                            <div className="flex flex-column gap-2">
                                <label htmlFor="start_date" className=' text-black'>{translate.promotion_end_date}</label>
                                <Calendar
                                    name="start_date"
                                    className="p-inputtext-sm md:mr-2 sm:w-full"
                                    placeholder={translate.promotion_end_date}
                                    selectionMode={"single"}
                                    disabled={loading}
                                    value={payload.end_date}
                                    onChange={async (e) => {
                                        payloadHandler(payload, e.target.value, 'end_date', (updateValue) => {
                                            setPayload(updateValue);
                                        });
                                    }}
                                />
                                <ValidationMessage field={"start_date"} />
                            </div>
                        </div>

                        <div className=" col-12 md:col-12 lg:col-12 py-3">
                            <div className=" flex flex-column gap-2">
                                <label htmlFor="promotion" className='text-black'>{translate.promotion_image}</label>
                                <InputText
                                    id="promotion"
                                    className="p-inputtext-sm text-black"
                                    tooltip='Promotion image'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const result = await uploadFile.image(dispatch, e.target.files[0], 'PROMOTION_IMAGE');
                                        if (result.status === 200) {
                                            const objectUrl = URL.createObjectURL(e.target.files[0]);
                                            setSrc(objectUrl);
                                            payloadHandler(payload, e.target.files[0], 'image', (updateValue) => {
                                                setPayload(updateValue);
                                            });
                                        }
                                    }}
                                />
                                <ValidationMessage field={'image'} />
                            </div>

                            <div className="col-12 flex justify-content-center align-items-center">
                                {src && (
                                    <Image preview width="100%" height="100%" className="img-promo" src={src} />
                                )}
                            </div>
                        </div>
                        <FormMainAction
                            cancel={translate.cancel}
                            onCancel={() => navigate(paths.promotion)}
                            submit={translate.submit}
                            onSubmit={submitPromotionCreate}
                            loading={loading}
                        />
                    </div>
                </Card>
            </div>
        </div>
    )
}