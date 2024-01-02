import { Card } from 'primereact/card'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { countries, tooltipOptions } from '../../../constants/config';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { faqService } from '../faqService';
import DeleteDialogButton from '../../../shares/DeleteDialogButton';
import { endpoints } from '../../../constants/endpoints';
import { generalStatus } from '../../../helpers/StatusHandler';
import { Dropdown } from 'primereact/dropdown';
import { Loading } from '../../../shares/Loading';
import { Badge } from 'primereact/badge';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';

export const FaqUpdate = () => {
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

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { faq } = useSelector((state) => state.faq);
    const { translate } = useSelector(state => state.setting);

    const payload = useRef(dynamicForm);
    const [statusPayload, setStatusPayload] = useState(faq?.status);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState([]);
    const [prevValue,setPrevValue] = useState();

    /**
     * loading data
     * **/
    const loadingData = useCallback(async () => {
        setLoading(true);
        await faqService.show(dispatch, params.id)
        setLoading(false);
    }, [dispatch, params])

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
        loadingData();
    }, [loadingData])

    useEffect(() => {
        if(faq) {
            setPrevValue(faq)
        }
    }, [faq])

    /**
     * faq update payload- [answer,question]
     * **/
    const submitFaqUpdate = async () => {
        setLoading(true);

        const keys = Object.keys(payload.current).map((keys) => keys);

        const answers = JSON.stringify(
          Object.fromEntries(
            keys.map((value) => {
              return [value, payload.current[value].answer];
            })
          )
        );
    
        const questions = JSON.stringify(
          Object.fromEntries(
            keys.map((value) => {
              return [value, payload.current[value].question];
            })
          )
        );
    
        const mainPayload = {
          answer: answers,
          question: questions,
          status : statusPayload?.status
        };

        console.log(mainPayload);


        // await faqService.update(dispatch, params.id, mainPayload)
        setLoading(false);
    }

    return (
        <>

            <Card
                title={translate.faq_update}

            >
                <Loading loading={loading} />

                <div className=' grid'>

                    <div className=' col-12 flex align-items-center justify-content-end'>
                        <div>

                            <DeleteDialogButton
                                visible={visible}
                                setVisible={setVisible}
                                url={endpoints.faq}
                                id={params.id}
                                redirect={paths.faq}
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

                    {prevValue && countries.map((value, index) => {
                        const codeNameQuestion = value.code.toLowerCase();

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
                                                defaultValue={prevValue?.question ? JSON.parse(prevValue?.question)[codeNameQuestion] : ""}
                                                disabled={loading}
                                                onChange={(e) => {
                                                    const codeNameQuestion = value.code.toLowerCase();
                                                    payload.current[codeNameQuestion].question = e.target.value;
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
                                            defaultValue={prevValue?.answer ? JSON.parse(prevValue?.answer)[codeNameQuestion] : ""}
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

                    <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="status" className=' text-black'>{translate.status}</label>
                            <Dropdown
                                inputId='status'
                                name='status'
                                autoComplete='status'
                                options={status}
                                placeholder="Select a general status"
                                disabled={loading}
                                value={statusPayload}
                                className="p-inputtext-sm text-black"
                                onChange={(e) => setStatusPayload(e.value)}
                            />

                            <ValidationMessage field={"status"} />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="flex flex-row justify-content-end align-items-center">
                            <Button
                                className="mx-2"
                                label="CANCEL"
                                severity="secondary"
                                outlined
                                size='small'
                                disabled={loading}
                                onClick={() => navigate(paths.faq)}
                            />

                            <Button
                                className="mx-2"
                                label="UPDATE"
                                severity="danger"
                                size='small'
                                disabled={loading}
                                onClick={() => submitFaqUpdate()}
                            />
                        </div>
                    </div>

                </div>

            </Card>

        </>
    )
}
