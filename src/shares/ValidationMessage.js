import { useSelector } from "react-redux";

export const ValidationMessage = ({field}) => {

    const state = useSelector(state => state.share);
    const { errors } = state;

    return (
        <>
            { errors && errors[field] && (
                <span className="error-message"> { errors[field][0] } </span>
            )}
        </>
    )
}