import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router'
import { promotionService } from '../promotionService';
import { promotionPayload } from '../promotionPayload';
import { endpoints } from '../../../constants/endpoints';
import { getRequest } from '../../../helpers/api';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { payloadHandler } from '../../../helpers/handler';
import { uploadFile } from '../../../helpers/uploadFile';
import { tooltipOptions } from '../../../constants/config';
import { Button } from 'primereact/button';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';
import { paths } from '../../../constants/paths';

const UpdatePromotion = () => {

  const params = useParams();
  const [payload, setPayload] = useState(promotionPayload.update);
  const [generalStatus, setGeneralStatus] = useState([]);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const { promotion } = useSelector((state) => state.promotion);

  console.log(generalStatus);

  const [loading, setLoading] = useState(false);

  const loadingData = useCallback(async () => {
    setLoading(true);
    await promotionService.show(dispatch, params.id);

    const response = await getRequest(`${endpoints.status}?type=general`);
    if (response.status === 200) {
      setGeneralStatus(response.data.general);
    };

    setLoading(false);
  }, [dispatch, params])

  const submitPromotionUpdate = async () => {
    setLoading(true);
    await promotionService.update(dispatch, params.id, payload)
    setLoading(false);
  }


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
          title="Update Promotion"
        >
          <div className="grid">

          <div className=' col-12 flex align-items-center justify-content-end'>
                    <div>

                        <DeleteDialogButton
                            visible={visible}
                            setVisible={setVisible}
                            url={paths.promotion}
                            id={params.id}
                        />

                        <Button
                            size='small'
                            severity='danger'
                            outlined
                            onClick={() => setVisible(true)}
                        >
                            <i className=' pi pi-trash'></i>
                        </Button>
                    </div>
                </div>

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
                <label htmlFor="title" className=' text-black'>Title</label>
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
                <label htmlFor="url" className=' text-black'>Promoiton Url</label>
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
                <label htmlFor="promotion" className=' text-black'>Choose promotion image</label>
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

            <div className="col-12">
              <div className="flex flex-row justify-content-end align-items-center">
                <Button
                  severity="danger"
                  label="Create"
                  onClick={submitPromotionUpdate}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UpdatePromotion