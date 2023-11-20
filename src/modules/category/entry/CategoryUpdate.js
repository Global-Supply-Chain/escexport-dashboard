import React, { useCallback, useEffect, useState } from 'react'
import { categoryPayload } from '../categoryPayload';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { tooltipOptions } from '../../../constants/config';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';

const CategoryUpdate = ({ dataSource }) => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(categoryPayload.update);

    const loadingDataSource = useCallback(() => {
        if (dataSource) {
            setPayload(dataSource);
        }
    }, [dataSource]);

    useEffect(() => {
        loadingDataSource();
    }, [loadingDataSource])

    return (
        <Card
            title="Category Update"
            subTitle="Category is purposing for item"
        >
            <div className=' grid'>

                <div className=' col-12'>

                </div>

                <div className=' col-12 md:col-6 lg:col-4 my-3 md:my-0'>
                    <div className="flex flex-column gap-2">
                        <label htmlFor="title" className=' text-black'>Title</label>
                        <InputText
                            className="p-inputtext-sm text-black"
                            id="title"
                            aria-describedby="title-help"
                            tooltip='Category title'
                            tooltipOptions={{ ...tooltipOptions }}
                            placeholder='Enter category title'
                            disabled={loading}
                            value={payload.title ? payload.title : ""}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'title', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"title"} />
                    </div>
                </div>

            </div>
        </Card>
    )
}

export default CategoryUpdate