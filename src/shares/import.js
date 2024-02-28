

import { Button } from 'primereact/button';
import React from 'react'
import { postRequest } from '../helpers/api';
import { useDispatch } from 'react-redux';
import { updateNotification } from './shareSlice';
import { baseURL } from '../constants/endpoints';

export const ImportExcel = ({ url, callback, disabled }) => {
    const dispatch = useDispatch()

    return (
        <div>

            <Button
                outlined
                disabled={disabled}
                icon="pi pi-cloud-upload"
                size='small'
                onClick={() => {
                    document.getElementById('excelImport').click();
                }}
            />
            <input hidden id='excelImport' type='file' accept='.xlsx' onChange={ async (e) => {
                const formData = new FormData();
                formData.append('file', e.target.files[0])
                const response = await postRequest(baseURL + '/' + url, formData);
                if (response.status === 200) {
                    dispatch(updateNotification({
                        show: true,
                        summary: "Success",
                        severity: "success",
                        detail: response.message
                    }));
                    callback();
                }
            }} />

        </div>
    )
}
