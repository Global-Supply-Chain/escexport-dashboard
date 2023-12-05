import { Card } from "primereact/card";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { categoryPayload } from "../categoryPayload";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { Avatar } from "primereact/avatar";
import { endpoints } from "../../../constants/endpoints";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch } from "react-redux";
import { categoryService } from "../categoryService";
import { Loading } from "../../../shares/Loading";

export const MainCategoryCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState(categoryPayload.createMain);
  const [loading, setLoading] = useState(false);

  const submitMainCategory = async () => {
    setLoading(true);
    await categoryService.mainCategoryStore(dispatch, {
      ...payload,
      level: 0,
    });
    setLoading(false);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <Card
          title="Create Main Category"
          subTitle="Category is purposing for item"
        >

          <Loading loading={loading} />

          <div className="grid">
            <div className="col-12 flex align-items-center justify-content-center">
              <form className="w-full flex flex-column justify-content-center align-items-center">
                <Avatar
                  className="mb-3"
                  icon="pi pi-user"
                  size="xlarge"
                  shape="circle"
                  image={
                    payload.icon ? `${endpoints.image}/${payload.icon}` : null
                  }
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
                {" "}
                Title{" "}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="title"
                  className="p-inputtext-sm"
                  placeholder="Enter category title"
                  value={payload.title}
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
                  value={payload.description}
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
                  label="CANCEL"
                  severity="secondary"
                  outlined
                  size="small"
                  disabled={loading}
                  onClick={() => navigate(paths.mainCategory)}
                />

                <Button
                  className="mx-2"
                  label="CREATE"
                  severity="danger"
                  size="small"
                  disabled={loading}
                  onClick={() => submitMainCategory()}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
