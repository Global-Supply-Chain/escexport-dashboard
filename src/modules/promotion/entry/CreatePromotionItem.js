import { InputText } from "primereact/inputtext";
import { tooltipOptions } from "../../../constants/config";
import { useCallback, useEffect, useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useParams } from "react-router-dom";

export const CreatePromotionItem = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        promotion_price: "",
        item_ids: []
    });

    const params = useParams();

    const initLoading = useCallback(async () => {
        const result = await getRequest(`${endpoints.item}`);

        console.log(result);
    },[]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    return (
        <div className="grid">
            <div className=' col-12 md:col-4 lg:col-4 py-3'>
                <div className="flex flex-column gap-2">
                    <label htmlFor="title" className='text-black'> Promotion Price </label>
                    <InputText
                        className="p-inputtext-sm text-black"
                        id="title"
                        aria-describedby="title-help"
                        tooltip="Promotion Price"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Promotion Price"
                        disabled={loading}
                        onChange={(e) => payloadHandler(payload, e.target.value, 'promotion_price', (updateValue) => {
                            setPayload(updateValue);
                        })}
                    />
                    <ValidationMessage field={"promotion_price"} />
                </div>
            </div>


            <div className="col-12 md:col-8 lg:col-8 py-3">
                <div className="flex flex-column gap-2">
                    <label htmlFor="title" className='text-black'> Choose Items </label>
                </div>
            </div>
        </div>

    )
}