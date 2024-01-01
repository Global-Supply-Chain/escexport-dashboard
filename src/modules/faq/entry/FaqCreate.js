import { Card } from "primereact/card";
import React, { useState } from "react";
import { payloadHandler } from "../../../helpers/handler";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { InputText } from "primereact/inputtext";
import { countries, tooltipOptions } from "../../../constants/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { paths } from "../../../constants/paths";
import { faqService } from "../faqService";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { Loading } from "../../../shares/Loading";

export const FaqCreate = () => {
  const languages = Object.fromEntries(
    countries.map((k) => {
      const codeName = k.code.toLowerCase();
      return [codeName, ""];
    })
  );

  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    question: languages,
    answer: languages,
  });

  const { translate } = useSelector((state) => state.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  console.log(payload);

  const dynamicPayloadHandler = (field, value, key) => {
    let getPayload = {...payload};
    getPayload[field][key] = value;
    setPayload(getPayload);
  }

  /**
   * faq create payload - [answer,question]
   * **/
  const submitFaqCreate = async () => {
    setLoading(true);
    await faqService.store(payload, dispatch);
    setLoading(false);
  };

  return (
    <div className=" grid">
      <div className=" col-12">
        <BreadCrumb />
      </div>

      <div className=" col-12">
        <Card title={translate.faq_create}>
          <Loading loading={loading} />

          <div className=" grid">
            {countries.map((value, index) => {
              return (
                <div key={`faq_lang_${index}`}>
                  <div className=" col-12 md:col-6 lg:col-4 my-3 md:my-0">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="answer" className=" text-black">
                        {translate.answer} {`${value.name} (required*)`}
                      </label>
                      <InputText
                        className="p-inputtext-sm text-black"
                        id="answer"
                        aria-describedby="answer-help"
                        tooltip="Faq answer"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter faq answer"
                        disabled={loading}
                        onChange={(e) => {
                            let getPayload = {...payload};
                            console.log(getPayload);
                            
                            getPayload.answer[value.code.toLowerCase()] = e.target.value
                            setPayload(getPayload);
                        }}
                      />
                      <ValidationMessage field={"answer"} />
                    </div>
                  </div>

                  <div className=" col-12 md:col-6 lg:col-4 my-3 md:my-0">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="question" className=" text-black">
                        {translate.question} (required*)
                      </label>
                      <InputText
                        className="p-inputtext-sm text-black"
                        id="question"
                        aria-describedby="question-help"
                        tooltip="Faq question"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter faq question"
                        disabled={loading}
                        onChange={(e) => {
                            let getPayload = {...payload};
                            getPayload.question[value.code.toLowerCase()] = e.target.value
                            setPayload(getPayload);
                        }}
                    />
                      <ValidationMessage field={"question"} />
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="col-12">
              <div className="flex flex-row justify-content-end align-items-center">
                <Button
                  className="mx-2"
                  label={translate.cancel}
                  severity="secondary"
                  outlined
                  size="small"
                  disabled={loading}
                  onClick={() => navigate(paths.faq)}
                />

                <Button
                  className="mx-2"
                  label={translate.submit}
                  severity="danger"
                  size="small"
                  disabled={loading}
                  onClick={() => submitFaqCreate()}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
