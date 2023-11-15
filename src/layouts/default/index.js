import { PrimeReactProvider } from 'primereact/api';
import { AppToolbar } from "./components/AppToolbar";
import { AppSidebar } from "./components/AppSidebar";
import { Outlet } from 'react-router-dom';

const layoutOptions = {
    cssTransition: true,
    ripple: true
}

export const DefaultLayout = () => {

    return(
        <PrimeReactProvider value={layoutOptions}>
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
    )
}