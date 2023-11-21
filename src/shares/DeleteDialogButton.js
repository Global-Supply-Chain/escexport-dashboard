import React, { useRef } from 'react'
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { delRequest } from '../helpers/api';
import { useNavigate } from 'react-router-dom';

const DeleteDialogButton = ({
    visible,
    setVisible,
    icon = "pi pi-exclamation-triangle",
    id,
    url
}) => {

    const toast = useRef(null);
    const navigate = useNavigate();

    const accept = async () => {

        const response = await delRequest(`${url}/${id}`);

        if(response?.status === 200){
            navigate(url);
            toast.current.show({ severity: 'success', summary: 'Confirmed', detail: response.message, life: 3000 });
        }
    }

    return (
        <div>

            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message="Do you want to delete this record?"
                header='Delete Confirmation'
                icon={icon}
                accept={accept}
            />

        </div>
    )
}

export default DeleteDialogButton