import { Card } from "primereact/card";
import React, { useRef, useState } from "react";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { InputText } from "primereact/inputtext";
import { countries, tooltipOptions } from "../../../constants/config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { paths } from "../../../constants/paths";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { Loading } from "../../../shares/Loading";
import { InputTextarea } from "primereact/inputtextarea";
import { Divider } from "primereact/divider";
import { Badge } from "primereact/badge";

export const FaqCreate = () => {
  const dynamicForm = Object.fromEntries(
    countries.map((k) => {
      const codeName = k.code.toLowerCase();
      return [
        codeName,
        {
          answer: "",
          question: "",
        },
      ];
    })
  );

  const [loading, setLoading] = useState(false);
  const payload = useRef(dynamicForm);

  const { translate } = useSelector((state) => state.setting);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const dynamicPayloadHandler = (field, value, key) => {
  //     let getPayload = {...payload};
  //     getPayload[field][key] = value;
  //     setPayload(getPayload);
  //   }

  /**
   * faq create payload - [answer,question]
   * **/
  const submitFaqCreate = async () => {
    setLoading(true);
    console.log(payload);

    // await faqService.store(payload, dispatch);
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
                <div className="col-12" key={`faq_lang_${index}`}>
                  <div className="grid">
                    <div className="col-12 md:col-12 my-3 md:my-0">
                      <div className="flex flex-column gap-2">
                        <div className="flex flex-row align-items-center justify-content-between">
                          <label htmlFor="question" className="text-black">
                            {translate.question} (required*)
                          </label>

                          <Badge value={`${value.name}`} />
                        </div>
                        <InputText
                          className="p-inputtext-sm text-black"
                          id="question"
                          aria-describedby="question-help"
                          tooltip="Faq question"
                          tooltipOptions={{ ...tooltipOptions }}
                          placeholder="Enter faq question"
                          disabled={loading}
                          onChange={(e) => {
                            const codeNameQuestion = value.code.toLowerCase();
                            payload.current[codeNameQuestion].question =
                              e.target.value;
                          }}
                        />
                        <ValidationMessage field={"question"} />
                      </div>
                    </div>
                  </div>

                  <div className=" col-12 md:col-12 my-3 md:my-0">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="answer" className=" text-black">
                        {translate.answer} (required*)
                      </label>
                      <InputTextarea
                        className="p-inputtext-sm text-black"
                        id="answer"
                        aria-describedby="answer-help"
                        tooltip="Faq answer"
                        tooltipOptions={{ ...tooltipOptions }}
                        placeholder="Enter faq answer"
                        disabled={loading}
                        onChange={(e) => {
                          const codeName = value.code.toLowerCase();
                          payload.current[codeName].answer = e.target.value;
                        }}
                        rows={4}
                      />
                      <ValidationMessage field={"answer"} />
                    </div>
                  </div>

                  <Divider />
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
