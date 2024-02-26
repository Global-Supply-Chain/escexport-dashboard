import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { promotionPayload } from "../promotionPayload";
import { promotionService } from "../promotionService";
import { useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { tooltipOptions } from '../../../constants/config';
import { Image } from "primereact/image";
import { Loading } from "../../../shares/Loading";
import { paths } from "../../../constants/paths";
import { useNavigate } from "react-router-dom";
import { FormMainAction } from "../../../shares/FormMainAction";

export const CreatePromotion = () => {

    const [payload, setPayload] = useState(promotionPayload.create);
    const [loading, setLoading] = useState(false);

    const { translate } = useSelector(state => state.setting);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /**
     * Promotion Create
     * Payload - [title,image,url]
     * @returns
     * **/
    const submitPromotionCreate = async () => {
        setLoading(true);
        await promotionService.store(payload, dispatch);
        setLoading(false);
    }


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

                        <div className=" col-12 flex justify-content-center align-items-center">

                            <div
                                className=" promotion-image bg-gray-300"
                            >
                                {
                                    payload?.image === "" | null ? (
                                        <span className=" pi pi-image text-2xl"></span>
                                    ) : (
                                        <Image preview width="100%" height="100%" className=" img-promo" src={payload?.image ? `${endpoints.image}/${payload.image}` : null} />
                                    )
                                }
                            </div>
                        </div>
                        <div className=" col-12 flex justify-content-center align-items-center">
                            <ValidationMessage field={'image'} />
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="title" className=' text-black'>{translate.title}</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="title"
                                    aria-describedby="title-help"
                                    tooltip='User full title'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter promotion title'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"title"} />
                            </div>
                        </div>

                        <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                            <div className="flex flex-column gap-2">
                                <label htmlFor="url" className=' text-black'>{translate.promotion_url}</label>
                                <InputText
                                    className="p-inputtext-sm text-black"
                                    id="url"
                                    aria-describedby="url-help"
                                    tooltip='Promotion url'
                                    tooltipOptions={{ ...tooltipOptions }}
                                    placeholder='Enter promotion url'
                                    disabled={loading}
                                    onChange={(e) => payloadHandler(payload, e.target.value, 'url', (updateValue) => {
                                        setPayload(updateValue);
                                    })}
                                />
                                <ValidationMessage field={"url"} />
                            </div>
                        </div>

                        <div className=" col-12 md:col-4 lg:ocl-4">
                            <div className=" flex flex-column gap-2">
                                <label htmlFor="promotion" className=' text-black'>{translate.promotion_image}</label>
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
                                            payloadHandler(payload, result.data.id, 'image', (updateValue) => {
                                                setPayload(updateValue);
                                            });
                                        }
                                    }}
                                />
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