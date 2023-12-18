import { Card } from 'primereact/card'
import React, { useCallback, useEffect, useState } from 'react'
import { payloadHandler } from '../../../helpers/handler';
import { faqPayload } from '../faqPayload';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
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

export const FaqUpdate = () => {

    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { faq } = useSelector((state) => state.faq);

    const [payload, setPayload] = useState(faqPayload.update);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState([]);

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
        if (faq) {
            setPayload(faq);
        }
    }, [faq])

    /**
     * faq update payload- [answer,question]
     * **/
    const submitFaqUpdate = async () => {
        setLoading(true);
        await faqService.update(dispatch, params.id, payload)
        setLoading(false);
    }

    return (
        <>

            <Card
                title={'Create Faq'}

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

                    <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="answer" className=' text-black'>Answer (required*)</label>
                            <InputText
                                className="p-inputtext-sm text-black"
                                id="answer"
                                name="answer"
                                autoComplete='answer'
                                aria-describedby="answer-help"
                                tooltip='Faq answer'
                                value={payload.answer ? payload?.answer : ""}
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
                                name="question"
                                autoComplete='question'
                                aria-describedby="question-help"
                                value={payload.question ? payload?.question : ''}
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

                    <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                        <div className="flex flex-column gap-2">
                            <label htmlFor="status" className=' text-black'>Status</label>
                            <Dropdown
                                inputId='status'
                                name='status'
                                autoComplete='status'
                                options={status}
                                placeholder="Select a general status"
                                disabled={loading}
                                value={payload.status}
                                className="p-inputtext-sm text-black"
                                onChange={(e) => payloadHandler(payload, e.value, 'status', (updateValue) => {
                                    setPayload(updateValue);
                                })}
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
