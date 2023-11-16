import { PrimeReactProvider } from 'primereact/api';
import { AppToolbar } from "./components/AppToolbar";
import { AppSidebar } from "./components/AppSidebar";
import { Outlet, useNavigate } from 'react-router-dom';
import { getData } from '../../helpers/localstorage';
import { keys } from '../../constants/config';
import { useEffect } from 'react';
import { Notification } from '../../shares/Notification';

const layoutOptions = {
    cssTransition: true,
    ripple: true
}

export const DefaultLayout = () => {

    const token = getData(keys.API_TOKEN);
    const navigate = useNavigate();

    useEffect(() => {
        if(!token) {
           navigate('/auth/login');
        }
    },[token, navigate]);

    return(
        <> 
            { token && (
                <PrimeReactProvider value={layoutOptions}>
                    <Notification />
                    <div className="wrapper">
                        <AppToolbar />
                        <div className='app-container'>
                        <AppSidebar />
                            <div className='app-content'>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </PrimeReactProvider>
            )}
        </>
    )
}