import { InputText } from "primereact/inputtext";
import { tooltipOptions } from "../../../constants/config";
import { useCallback, useEffect, useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { getRequest, postRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";
import { useParams } from "react-router-dom";
import { MultiSelect } from 'primereact/multiselect';
import { Button } from "primereact/button";
import { updateNotification } from "../../../shares/shareSlice";
import { useDispatch } from "react-redux";

export const CreatePromotionItem = ({id, setStatus}) => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        promotion_price: "",
        item_ids: []
    });
    const [itemLists, setItemLists] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);

    const params = useParams();
    const dispatch = useDispatch();

    const initLoading = useCallback(async () => {
        const result = await getRequest(`${endpoints.item}?status=ACTIVE`);
        if(result.status === 200){
            const formatData = result.data.map((item) => {
                return {
                    name : item.name,
                    code: item.id
                }
            })
            setItemLists(formatData)
        }
    },[]);

    useEffect(() => {
        initLoading();
    }, [initLoading]);

    const submit = async () => {
        try {

            const response = await postRequest(`${endpoints.promotion}/${id}/item`, payload);
            if(response.status === 200){
                dispatch(updateNotification({
                    show: true,
                    summary: "Success",
                    severity: "success",
                    detail: 'Promotion in item is created successfully'
                  }));
                setStatus(response.status)
            }

        } catch (error) {
            console.error('Promotion in item store', error);
        }
    }
    

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
                    <label htmlFor="item" className='text-black'> Choose Items </label>
                    <MultiSelect 
                        value={selectedItem} 
                        onChange={(e) => {
                            setSelectedItem(e.value)
                            const itemLists = e.value.map((item) => {
                                return item.code
                            })
                            setPayload({
                                ...payload,
                                item_ids: itemLists
                            })
                        }} 
                        options={itemLists} 
                        optionLabel="name" 
                        placeholder="Select promotion item"
                        className="w-full md:w-20rem" 
                    />
                  <ValidationMessage field={"item_id"} />
                </div>
            </div>

            <div className="col-12 flex align-items-center justify-content-end">
                    <Button 
                        size="small"
                        severity="danger"
                        onClick={submit}
                    >
                        Submit
                    </Button>
            </div>
        </div>

    )
}