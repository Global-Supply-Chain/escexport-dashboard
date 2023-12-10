import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { payloadHandler } from '../../../helpers/handler';
import { faqPayload } from '../faqPayload';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from 'primereact/button';
import { paths } from '../../../constants/paths';
import { faqService } from '../faqService';
import { BreadCrumb } from '../../../shares/BreadCrumb';
import { Loading } from '../../../shares/Loading';

export const FaqCreate = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(faqPayload.create);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * faq create payload - [answer,question]
     * **/
    const submitFaqCreate = async () => {
        setLoading(true);
        await faqService.store(payload, dispatch);
        setLoading(false);
    }


    return (
        <>

            <div className=' grid'>

                <div className=' col-12'>
                    <BreadCrumb />
                </div>

                <div className=' col-12'>
                    <Card
                        title={'Create Faq'}

                    >

                        <Loading loading={loading} />

                        <div className=' grid'>

                            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="answer" className=' text-black'>Answer (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="answer"
                                        aria-describedby="answer-help"
                                        tooltip='Faq answer'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter faq answer'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'answer', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"answer"} />
                                </div>
                            </div>

                            <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                                <div className="flex flex-column gap-2">
                                    <label htmlFor="question" className=' text-black'>Question (required*)</label>
                                    <InputText
                                        className="p-inputtext-sm text-black"
                                        id="question"
                                        aria-describedby="question-help"
                                        tooltip='Faq question'
                                        tooltipOptions={{ ...tooltipOptions }}
                                        placeholder='Enter faq question'
                                        disabled={loading}
                                        onChange={(e) => payloadHandler(payload, e.target.value, 'question', (updateValue) => {
                                            setPayload(updateValue);
                                        })}
                                    />
                                    <ValidationMessage field={"question"} />
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
                                        label="CREATE"
                                        severity="danger"
                                        size='small'
                                        disabled={loading}
                                        onClick={() => submitFaqCreate()}
                                    />
                                </div>
                            </div>

                        </div>

                    </Card>
                </div>

            </div>

        </>
    )
}
