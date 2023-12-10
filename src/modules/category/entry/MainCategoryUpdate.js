import { InputText } from "primereact/inputtext";
import { useCallback, useEffect, useRef, useState } from "react";
import { categoryPayload } from "../categoryPayload";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Button } from "primereact/button";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { Avatar } from "primereact/avatar";
import { endpoints } from "../../../constants/endpoints";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { categoryService } from "../categoryService";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { getRequest } from "../../../helpers/api";

export const MainCategoryUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const { mainCategory } = useSelector((state) => state.category);
  const [payload, setPayload] = useState(categoryPayload.update);
  const [loading, setLoading] = useState(false);

  const generalStatus = useRef([]);

  const submitMainCategoryUpdate = async () => {
    setLoading(true);
    await categoryService.mainCategoryUpdate(dispatch, params.id, payload);
    setLoading(false);
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    await categoryService.mainCategoryShow(dispatch, params.id);
    const result = await getRequest(`${endpoints.status}?type=general`);

    if (result.status === 200) {
      generalStatus.current = result.data.general;
    }

    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (mainCategory) {
      setPayload(mainCategory);
    }
  }, [mainCategory]);

  return (
    <Card
      title="Update Main Category"
      subTitle="Category is purposing for item"
    >
      <div className="grid">
        <div className="col-12 flex align-items-center justify-content-end">
          <Button 
            outlined
            size="small"
            tooltip="View Sub Categories"
            tooltipOptions={{ ...tooltipOptions }}
            severity="info"
            icon="pi pi-list"
            onClick={() => navigate(`level/${Number(mainCategory.level) + 1}`)}
          />
        </div>

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
          <label htmlFor="name" className="input-label">
            Title
          </label>
          <div className="p-inputgroup mt-2">
            <InputText
              id="title"
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

        <div className="col-12 md:col-4 lg:col-4 my-3">
          <label htmlFor="password" className="input-label">
            Description
          </label>
          <div className="p-inputgroup mt-2">
            <InputText
              id="description"
              className="p-inputtext-sm"
              aria-describedby="description-help"
              type="description"
              placeholder="Enter description"
              value={payload.description ? payload.description : ""}
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

        <div className="col-12 md:col-4 lg:col-4 my-3">
          <label htmlFor="phone" className="input-label">
            Status
          </label>
          <div className="p-inputgroup mt-2">
            <Dropdown
              options={generalStatus.current}
              value={payload.status ? payload.status : ""}
              onChange={(e) =>
                payloadHandler(payload, e.value, "status", (updateValue) => {
                  setPayload(updateValue);
                })
              }
              placeholder="Select Status"
              disabled={loading}
              className="p-inputtext-sm"
            />
          </div>
          <ValidationMessage field="category_id" />
        </div>

        <div className="col-12">
          <div className="flex flex-row justify-content-end align-items-center">
            <Button
              className="mx-2"
              label="CANCEL"
              severity="secondary"
              outlined
              size="small"
              disabled={loading}
              onClick={() => navigate(paths.category)}
            />

            <Button
              className="mx-2"
              label="UPDATE"
              severity="danger"
              size="small"
              disabled={loading}
              onClick={() => submitMainCategoryUpdate()}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
