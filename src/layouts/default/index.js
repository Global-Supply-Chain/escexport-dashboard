import { PrimeReactProvider } from 'primereact/api';
import { AppToolbar } from "./components/AppToolbar";
import { AppSidebar } from "./components/AppSidebar";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getData } from '../../helpers/localstorage';
import { keys } from '../../constants/config';
import { useCallback, useEffect } from 'react';
import { Notification } from '../../shares/Notification';

const layoutOptions = {
    cssTransition: true,
    ripple: true
}

export const DefaultLayout = () => {

    const token = getData(keys.API_TOKEN);
    const navigate = useNavigate();

    const location = useLocation();

    const authRedirect = useCallback(async () => {
        if(token && location.pathname === '/') {
            navigate('/dashboard');
        }

        if(!token) {
            navigate("/auth/login");
        }
    },[token, location, navigate]);

    useEffect(() => {
        authRedirect();
    },[authRedirect]);

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