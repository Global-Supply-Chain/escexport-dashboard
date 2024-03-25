import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { promotionService } from '../promotionService';
import { promotionPayload } from '../promotionPayload';
import { endpoints } from '../../../constants/endpoints';
import { Calendar } from "primereact/calendar";
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { uploadFile } from '../../../helpers/uploadFile';
import { tooltipOptions } from '../../../constants/config';
import { paths } from '../../../constants/paths';
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../../shares/Loading';
import { useNavigate } from "react-router-dom";
import { FormMainAction } from '../../../shares/FormMainAction';
import { getRequest } from '../../../helpers/api';
import { formBuilder } from '../../../helpers/formBuilder';

const UpdatePromotion = () => {

  const maxStartDate = new Date();

  const params = useParams();
  const [payload, setPayload] = useState(promotionPayload.update);
  const [loading, setLoading] = useState(false);
  const [appType, setAppType] = useState([]);
  const [src, setSrc] = useState(null);
  const [status, setStatus] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { promotion } = useSelector((state) => state.promotion);
  const { translate } = useSelector(state => state.setting);

  const submitPromotionUpdate = async () => {
    setLoading(true);
    const formData = formBuilder(payload, promotionPayload.update);
    await promotionService.update(dispatch, params.id, formData);
    setLoading(false);
  }

  const initLoading = useCallback(async () => {
    setLoading(true);
    await promotionService.show(dispatch, params.id);

    const appTypeResult = await getRequest(`${endpoints.status}?type=apptype`);
    if (appTypeResult.status === 200) {
      setAppType(appTypeResult.data.apptype);
    }

    const statusTypeResult = await getRequest(`${endpoints.status}?type=general`);
    if (statusTypeResult.status === 200) {
      setStatus(statusTypeResult.data.general);
    }

    setLoading(false);

  }, [dispatch, params.id], params);

  useEffect(() => {
    initLoading();
  }, [initLoading]);


  useEffect(() => {
    if (promotion) {
      setSrc(`${endpoints.image}/${promotion.image?.image}`);
      let updatePayload = {...promotion};
      delete updatePayload.image;
      setPayload(updatePayload);
    }
  }, [promotion])


  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card title={translate.promotion_update}>

          <Loading loading={loading} />

          <div className="grid">
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
                    value={payload.title ? payload.title : ""}
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
                    value={payload.app_type ? payload.app_type : ""}
                    onChange={(e) => payloadHandler(payload, e.value, 'app_type', (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"app_type"} />
                </div>
              </div>

              <div className=" col-12 md:col-2 lg:col-2 py-3">
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
                    value={payload.start_date ? new Date(payload.start_date) : new Date()}
                    onChange={async (e) => {
                      payloadHandler(payload, e.target.value, 'start_date', (updateValue) => {
                        setPayload(updateValue);
                      });
                    }}
                  />
                  <ValidationMessage field={"start_date"} />
                </div>
              </div>


              <div className="col-12 md:col-2 lg:col-2 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="start_date" className=' text-black'>{translate.promotion_end_date}</label>
                  <Calendar
                    name="start_date"
                    className="p-inputtext-sm md:mr-2 sm:w-full"
                    placeholder={translate.promotion_end_date}
                    selectionMode={"single"}
                    disabled={loading}
                    value={payload.end_date ? new Date(payload.end_date) : new Date()}
                    onChange={async (e) => {
                      payloadHandler(payload, e.target.value, 'end_date', (updateValue) => {
                        setPayload(updateValue);
                      });
                    }}
                  />
                  <ValidationMessage field={"start_date"} />
                </div>
              </div>

              <div className=' col-12 md:col-2 lg:col-2 py-3'>
                <div className="flex flex-column gap-2">
                  <label htmlFor="status" className='text-black'>{translate.status}</label>
                  <Dropdown
                    inputId='status'
                    name='status'
                    className="p-inputtext-sm"
                    options={status}
                    placeholder={translate.status}
                    disabled={loading}
                    value={payload.status}
                    onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"status"} />
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

                <div className="col-12 flex justify-content-center align-items-centerc mt-3">
                  {src && (
                    <Image preview width="100%" height="100%" className="img-promo" src={src} />
                  )}
                </div>
              </div>

              <FormMainAction
                cancel={translate.cancel}
                onCancel={() => navigate(paths.promotion)}
                submit={translate.submit}
                onSubmit={submitPromotionUpdate}
                loading={loading}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdatePromotion