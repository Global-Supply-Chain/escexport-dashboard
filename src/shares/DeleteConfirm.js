import { Button } from "primereact/button"
import DeleteDialogButton from "./DeleteDialogButton"
import { useState } from "react";

export const DeleteConfirm = ({id,url,redirect}) => {

    const [visible, setVisible] = useState(false);

  return (
    <div className=' col-12 flex align-items-center justify-content-end'>
    <div>

        <DeleteDialogButton
            visible={visible}
            setVisible={setVisible}
            url={url}
            id={id}
            redirect={redirect}
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
  )
}
