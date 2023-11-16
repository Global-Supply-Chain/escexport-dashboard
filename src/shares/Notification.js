import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { updateNotification } from './shareSlice';

export const Notification = () => {
    const toast = useRef(null);

    const state = useSelector(state => state.share);
    const { notification } = state;

    const dispatch = useDispatch();

    useEffect(() => {
        if(notification.show === true) {
            toast.current.show({
                ...notification
            })
        }   
    },[notification]);

    return (
        <Toast 
            ref={toast}
            onHide={() => {
                dispatch(updateNotification({
                    show: false
                }));
            }}
        />
    )
}