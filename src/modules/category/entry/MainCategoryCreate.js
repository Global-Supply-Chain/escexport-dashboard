import { Card } from "primereact/card";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { categoryPayload } from "../categoryPayload";
import { tooltipOptions } from "../../../constants/config";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";
import { Avatar } from "primereact/avatar";
import { endpoints } from "../../../constants/endpoints";
import { uploadFile } from "../../../helpers/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { categoryService } from "../categoryService";
import { Loading } from "../../../shares/Loading";
import { FormMainAction } from "../../../shares/FormMainAction";

export const MainCategoryCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { translate } = useSelector(state => state.setting);

  const [payload, setPayload] = useState(categoryPayload.create);
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
          title={translate.main_category_create}
          subTitle={translate.main_category_subtitle}
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
              <label htmlFor="title" className="input-label">
                {translate.title}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="title"
                  name="title"
                  autoComplete="main category title"
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
              <label htmlFor="description" className="input-label">
                {translate.description}
              </label>
              <div className="p-inputgroup mt-2">
                <InputText
                  id="description"
                  name="description"
                  autoComplete="category description"
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

            <FormMainAction
              cancel={translate.cancel}
              onCancel={() => navigate(paths.category)}
              submit={translate.submit}
              onSubmit={submitMainCategory}
              loading={loading}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};
