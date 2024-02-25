import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import { paths } from "../../../constants/paths";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userService } from "../userService";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { payloadHandler } from "../../../helpers/handler";
import { tooltipOptions } from "../../../constants/config";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { userPayload } from "../userPayload";
import { Calendar } from 'primereact/calendar';
import { FormMainAction } from "../../../shares/FormMainAction";
import moment from "moment";

export const UserCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(userPayload.store);

  const { translate } = useSelector(state => state.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  /**
   * Create user account
   * @returns 
   */
  const submitUser = async () => {
    setLoading(true);
    const response = await userService.store(payload, dispatch);
    console.log(response);
    if(response.data) {
      navigate(`${paths.user}/${response.data.id}`);
    }
    setLoading(false);
    return;
  };

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <BreadCrumb />
        </div>

        <div className=" col-12">
          <Card
            title={translate.user_create}
            subTitle={translate.user_subtitle}
          >
            <div className=" grid">
              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="name" className=" text-black"> {translate.name} (required) </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="name"
                    name={'name'}
                    aria-describedby="name-help"
                    tooltip={translate.name}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.name}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "name", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"name"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="email" className=" text-black"> {translate.email} (required) </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    keyfilter={"email"}
                    id="email"
                    name="email"
                    aria-describedby="email-help"
                    tooltip={translate.email}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.email}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "email", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"email"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="phone" className=" text-black"> {translate.phone} (required) </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    keyfilter={"num"}
                    id="phone"
                    name="phone"
                    aria-describedby="phone-help"
                    tooltip={translate.phone}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.phone}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "phone", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"phone"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="dob" className=" text-black"> {translate.dob} </label>
                  <Calendar
                    className="p-inputtext-sm text-black"
                    placeholder="Choose Birthday"
                    id="dob"
                    name="dob"
                    tooltip={translate.dob}
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    dateFormat="yy/mm/dd"
                    onChange={(e) => payloadHandler(payload, moment(e.target.value).format('YYYY/MM/DD'), "dob", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"dob"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="occupation" className=" text-black"> {translate.occupation} </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="occupation"
                    name="occupation"
                    aria-describedby="occupation-help"
                    tooltip={translate.occupation}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.occupation}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "occupation", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"occupation"} />
                </div>
              </div>

              <div className=" col-12 md:col-6 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="position" className=" text-black"> {translate.position} </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="position"
                    name="position"
                    aria-describedby="position-help"
                    tooltip={translate.position}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.position}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "position", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"position"} />
                </div>
              </div>

              <div className=" col-12 md:col-8 lg:col-4 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="gender" className=" text-black"> {translate.gender} </label>
                  <Dropdown
                    inputId='gender'
                    name='gender'
                    className="p-inputtext-sm text-black"
                    options={["MALE", "FEMALE"]}
                    placeholder={translate.gender}
                    tooltip={translate.gender}
                    tooltipOptions={{ ...tooltipOptions }}
                    disabled={loading}
                    value={payload.gender}
                    onChange={(e) => payloadHandler(payload, e.value, 'gender', (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"gender"} />
                </div>
              </div>

              <div className=" col-12 md:col-8 lg:col-8 py-3">
                <div className="flex flex-column gap-2">
                  <label htmlFor="address" className=" text-black"> {translate.address} </label>
                  <InputText
                    className="p-inputtext-sm text-black"
                    id="address"
                    name="address"
                    aria-describedby="address-help"
                    tooltip={translate.address}
                    tooltipOptions={{ ...tooltipOptions }}
                    placeholder={translate.address}
                    disabled={loading}
                    onChange={(e) => payloadHandler(payload, e.target.value, "address", (updateValue) => {
                      setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"address"} />
                </div>
              </div>
            </div>

            <FormMainAction
              onCancel={() => navigate(paths.user)}
              onSubmit={() => submitUser()}
              loading={loading}
            />
          </Card>
        </div>
      </div>
    </>
  );
};
