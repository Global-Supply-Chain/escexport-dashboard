import { Toolbar } from "primereact/toolbar"
import { Image } from "primereact/image"
import { Button } from "primereact/button"
import { useDispatch } from "react-redux"; 
import logo from "../../../assets/images/logo.jpeg";
import { sidebarToggle } from "../../../shares/shareSlice";

const StartContent = () => {
    const dispatch = useDispatch();

    return(
        <div className="flex flex-row justify-content-center align-items-center">
            <Image 
                src={logo} 
                width="50" 
                height="50" 
                alt="GSC Export" 
                title="GSC Export" 
            />
            
            <span className="title"> GSC Export </span>

            <Button 
                className="menu-btn"
                size="small"
                outlined
                icon="pi pi-bars"
                text
                onClick={() => dispatch(sidebarToggle())}
            />
        </div>
    )
}

export const AppToolbar = () => {
    
    return(
        <div className="app-toolbar">
            <Toolbar 
                className="primary-color toolbar"
                start={<StartContent />} 
            />
        </div>
    )
}