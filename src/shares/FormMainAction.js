import { Button } from "primereact/button"
import { useSelector } from "react-redux";


export const FormMainAction = ({ onCancel, onSubmit, loading }) => {

    const { translate } = useSelector(state => state.setting);

    return (
        <div className="col-12 mt-3">
            <div className="flex flex-row justify-content-end align-items-center">
                <Button
                    className="mx-2"
                    label={translate.cancel}
                    severity="secondary"
                    outlined
                    size='small'
                    disabled={loading}
                    onClick={onCancel}
                />

                <Button
                    className="mx-2"
                    label={translate.submit}
                    severity="danger"
                    size='small'
                    disabled={loading}
                    onClick={onSubmit}
                />
            </div>
        </div>
    )
}
