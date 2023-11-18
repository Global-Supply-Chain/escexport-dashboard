import React, { useRef } from 'react'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { delRequest } from '../helpers/api';
import { paths } from '../constants/paths';

const ConfirmDialogButton = ({
    visible,
    setVisible,
    message,
    header,
    icon = "pi pi-exclamation-triangle",
    acceptMessage,
    rejectMessage,
    callback
}) => {

    const toast = useRef(null);

    const accept = async () => {

        const response = await delRequest(`${paths.user}/${acceptMessage?.id}`);

        if(response?.status === 200){
            callback()
        }


        toast.current.show({ severity: acceptMessage?.severity, summary: acceptMessage?.summary, detail: acceptMessage?.detail, life: acceptMessage?.life });
    }

    const reject = () => {
        toast.current.show({ severity: rejectMessage?.severity, summary: rejectMessage?.summary, detail: rejectMessage?.detail, life: rejectMessage?.life });
    }

    return (
        <div>

            <Toast ref={toast} />
            <ConfirmDialog
                visible={visible}
                onHide={() => setVisible(false)}
                message={message}
                header={header}
                icon={icon}
                accept={accept}
                reject={reject}
            />

        </div>
    )
}

export default ConfirmDialogButton