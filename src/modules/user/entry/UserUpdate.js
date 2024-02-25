import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import React, { useCallback, useEffect, useState } from 'react'
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { payloadHandler } from '../../../helpers/handler';
import { paths } from '../../../constants/paths';
import { useNavigate, useParams } from 'react-router-dom';
import { getRequest } from '../../../helpers/api';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { userService } from '../userService';
import { userPayload } from '../userPayload';
import { endpoints } from '../../../constants/endpoints';
import { tooltipOptions } from "../../../constants/config";
import { Loading } from '../../../shares/Loading';
import { Profile } from '../../../shares/Profile';
import { formBuilder } from '../../../helpers/formBuilder';
import { FormMainAction } from '../../../shares/FormMainAction';
import moment from 'moment';

export const UserUpdate = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { user } = useSelector(state => state.user);
  const { translate } = useSelector(state => state.setting);

  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState([]);
  const [payload, setPayload] = useState(userPayload.update);

  /**
   * Loading Data
   */
  const loadingData = useCallback(async () => {
    setLoading(true);
    await userService.show(dispatch, params.id);

    const response = await getRequest(`${endpoints.status}?type=user`);
    if (response.status === 200) {
      setUserStatus(response.data.user);
    };
    setLoading(false);
  }, [dispatch, params.id]);

  /**
   * Submit update user infromation
   * @returns 
   */
  const submitUpdateUser = async () => {
    setLoading(true);
    let updatePayload = {...payload};
    updatePayload.dob = moment(updatePayload.dob).format('YYYY/MM/DD');
    const formData = formBuilder(updatePayload, userPayload.update);
    await userService.update(dispatch, formData, params.id)
    setLoading(false);
    return;
  }

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (user) {
      setPayload(user);
    }
  }, [user])

  return (
    <Card
      title={translate.user_update}
      subTitle={translate.user_subtitle}
    >
      <Loading loading={loading} />

      <div className='grid'>
        <div className='col-12 flex align-items-center justify-content-center'>
          <form className="w-full flex flex-column justify-content-center align-items-center">

            <Profile
              payload={payload}
              setPayload={setPayload}
              field={'profile'}
              src={Number(payload.profile) ? `${endpoints.image}/${payload.profile}` : null}
            />

            <ValidationMessage field={'profile'} />
            <ValidationMessage field={'file'} />
          </form>
        </div>

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
              value={payload.name || ""}
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
              value={payload.email || ""}
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
              value={payload.phone || ""}
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
              value={payload.dob}
              onChange={(e) => payloadHandler(payload, e.target.value, "dob", (updateValue) => {
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
              value={payload.occupation || ""}
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
              value={payload.position || ""}
              onChange={(e) => payloadHandler(payload, e.target.value, "position", (updateValue) => {
                setPayload(updateValue);
              })}
            />
            <ValidationMessage field={"position"} />
          </div>
        </div>

        <div className=" col-12 md:col-3 lg:col-3 py-3">
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
              value={payload.gender || "MALE"}
              onChange={(e) => payloadHandler(payload, e.value, 'gender', (updateValue) => {
                setPayload(updateValue);
              })}
            />
            <ValidationMessage field={"gender"} />
          </div>
        </div>

        <div className=' col-12 md:col-3 lg:col-3 py-3'>
          <div className="flex flex-column gap-2">
            <label htmlFor="status" className=' text-black'>{translate.status}</label>
            <Dropdown
              inputId='status'
              name='status'
              className="p-inputtext-sm text-black"
              options={userStatus}
              placeholder="Select a user status"
              disabled={loading}
              value={payload.status || "PENDING"}
              onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                setPayload(updateValue);
              })}
            />

            <ValidationMessage field={"status"} />
          </div>
        </div>

        <div className=" col-12 md:col-6 lg:col-6 py-3">
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
              value={payload.address || ""}
              onChange={(e) => payloadHandler(payload, e.target.value, "address", (updateValue) => {
                setPayload(updateValue);
              })}
            />
            <ValidationMessage field={"address"} />
          </div>
        </div>

        <FormMainAction
          onCancel={() => navigate(paths.user)}
          onSubmit={() => submitUpdateUser()}
          loading={loading}
        />


      </div>
    </Card>
  )
}