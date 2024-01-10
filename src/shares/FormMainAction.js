import { Button } from "primereact/button"


export const FormMainAction = ({ cancel, cancelClick, submit, submitClick, loading }) => {
    return (
        <div className="col-12">
            <div className="flex flex-row justify-content-end align-items-center">
                <Button
                    className="mx-2"
                    label={cancel}
                    severity="secondary"
                    outlined
                    size='small'
                    disabled={loading}
                    onClick={cancelClick}
                />

                <Button
                    className="mx-2"
                    label={submit}
                    severity="danger"
                    size='small'
                    disabled={loading}
                    onClick={submitClick}
                />
            </div>
        </div>
    )
}
