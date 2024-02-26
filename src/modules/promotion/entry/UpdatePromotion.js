import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { promotionService } from '../promotionService';
import { promotionPayload } from '../promotionPayload';
import { endpoints } from '../../../constants/endpoints';
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
import { generalStatus } from '../../../helpers/StatusHandler';
import { Loading } from '../../../shares/Loading';
import { useNavigate } from "react-router-dom";
import { FormMainAction } from '../../../shares/FormMainAction';
import { DeleteConfirm } from '../../../shares/DeleteConfirm';

const UpdatePromotion = () => {

  const params = useParams();
  const [payload, setPayload] = useState(promotionPayload.update);
  const [status, setStatus] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { promotion } = useSelector((state) => state.promotion);
  const { translate } = useSelector(state => state.setting);

  const [loading, setLoading] = useState(false);

  const loadingData = useCallback(async () => {
    setLoading(true);
    await promotionService.show(dispatch, params.id);

    setLoading(false);
  }, [dispatch, params])

  const submitPromotionUpdate = async () => {
    setLoading(true);
    await promotionService.update(dispatch, params.id, payload)
    setLoading(false);
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

  useEffect(() => {
    loadingData()
  }, [loadingData])

  useEffect(() => {
    if (promotion) {
      setPayload(promotion);
    }
  }, [promotion])


  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>


      <div className="col-12">
        <Card
          title={translate.promotion_update}
        >
          <Loading loading={loading} />

          <div className="grid">

            <DeleteConfirm
              url={paths.promotion}
              id={params.id}
              redirect={paths.promotion}
            />

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
                  value={payload?.title ? payload.title : ""}
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
                  value={payload?.url ? payload.url : ""}
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

            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
              <div className="flex flex-column gap-2">
                <label htmlFor="status" className=' text-black'>{translate.status}</label>
                <Dropdown
                  inputId='status'
                  name='promotion status'
                  autoComplete='promotion status'
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

            <FormMainAction
              cancel={translate.cancel}
              onCancel={() => navigate(paths.promotion)}
              submit={translate.update}
              onSubmit={submitPromotionUpdate}
              loading={loading}
            />

          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdatePromotion