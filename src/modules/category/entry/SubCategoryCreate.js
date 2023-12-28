import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { InputText } from "primereact/inputtext";
import { tooltipOptions } from "../../../constants/config";
import { Button } from "primereact/button";
import { categoryPayload } from "../categoryPayload";
import { categoryService } from "../categoryService";
import { useParams } from "react-router-dom";

export const SubCategoryCreate = ({ dataSource }) => {
  const dispatch = useDispatch();
  const urlParams = useParams();
  const { translate } = useSelector(state => state.setting);

  const [payload, setPayload] = useState(categoryPayload.create);
  const [loading, setLoading] = useState(false);

  const submitSubCategoryCreate = async () => {
    setLoading(true);
    const result = await categoryService.store({
      ...payload, 
      level: Number(urlParams.level),
      main_category_id: urlParams.id
    }, dispatch);

    if(result.status === 200) {
      await categoryService.subIndex(dispatch, {
        ...categoryPayload.subCategoryPaginateParams,
        filter: "main_category_id,level",
        value: `${urlParams.id},${urlParams.level}` 
      });
    }
    setLoading(false);
  };

  return (
    <Card
      title={translate.sub_category_create}
      subTitle={translate.sub_category_subtitle}
    >
      <div className="grid">
        <div className="col-12 flex align-items-center justify-content-center">
          <form className="w-full flex flex-column justify-content-center align-items-center">
            <Avatar
              className="mb-3"
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
              image={payload.icon ? `${endpoints.image}/${payload.icon}` : null}
              onClick={() => {
                document.getElementById("icon").click();
              }}
            />
            <input
              className="hidden"
              id="icon"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const result = await uploadFile.image(
                  dispatch,
                  e.target.files[0],
                  "CATEGORY_ICON"
                );
                if (result.status === 200) {
                  payloadHandler(
                    payload,
                    result.data.id,
                    "icon",
                    (updateValue) => {
                      setPayload(updateValue);
                    }
                  );
                }
              }}
            />

            <ValidationMessage field={"icon"} />
            <ValidationMessage field={"file"} />
          </form>
        </div>

        <div className="col-12 md:col-4 lg:col-4 my-3">
          <label htmlFor="title" className="input-label">
            {translate.title}
          </label>
          <div className="p-inputgroup mt-2">
            <InputText
              id="title"
              name='title'
              autoComplete="title"
              className="p-inputtext-sm"
              placeholder="Enter category title"
              value={payload ? payload.title : ""}
              aria-describedby="title-help"
              tooltip="Category title"
              tooltipOptions={{ ...tooltipOptions }}
              disabled={loading}
              onChange={(e) =>
                payloadHandler(
                  payload,
                  e.target.value,
                  "title",
                  (updateValue) => {
                    setPayload(updateValue);
                  } 
                )
              }
            />
          </div>
          <ValidationMessage field="title" />
        </div>

        <div className="col-12 md:col-8 lg:col-8 my-3">
          <label htmlFor="description" className="input-label">
            {translate.description}
          </label>
          <div className="p-inputgroup mt-2">
            <InputText
              id="description"
              name="description"
              autoComplete="description"
              className="p-inputtext-sm"
              aria-describedby="description-help"
              type="description"
              placeholder="Enter description"
              value={payload ? payload.description : ""}
              tooltip="Category description"
              tooltipOptions={{ ...tooltipOptions }}
              disabled={loading}
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
          </div>
          <ValidationMessage field="description" />
        </div>

        <div className="col-12">
          <div className="flex flex-row justify-content-end align-items-center">
            <Button
              className="mx-2"
              label={translate.submit}
              severity="danger"
              size="small"
              disabled={loading}
              onClick={() => submitSubCategoryCreate()}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
