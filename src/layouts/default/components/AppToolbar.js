import { Toolbar } from "primereact/toolbar"
import { Image } from "primereact/image"
import logo from "../../../assets/images/logo.jpeg";

const StartContent = () => {
    return(
        <div className="flex flex-row justify-content-center align-items-center">
            <Image 
                src={logo} 
                width="50" 
                height="50" 
                alt="GSCExport" 
                title="GSCExport" 
            />
            
            <span className="title"> GSC Export </span>
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