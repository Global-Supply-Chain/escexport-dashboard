import { Toolbar } from "primereact/toolbar"
import { Image } from "primereact/image"
import { Button } from "primereact/button"
import { useDispatch, useSelector } from "react-redux"; 
import logo from "../../../assets/images/logo.jpeg";
import { sidebarToggle } from "../../../shares/shareSlice";
import { useEffect, useState } from "react";
import { endpoints } from "../../../constants/endpoints";
import { removeAllData } from "../../../helpers/localstorage";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../constants/paths";

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

const EndContent = () => {
    const [adminProfile, setProfile] = useState(null);
    const { profile } = useSelector(state => state.admin);
    
    const navigate = useNavigate();

    const logout = async () => {
        removeAllData();
        navigate(paths.adminLogout);
    }

    useEffect(() => {
        if(profile) {
            setProfile(profile);
        }
    }, [profile]);

    return(
        <>
            {adminProfile && (
                <div className="flex flex-row align-items-center justify-content-center mx-3">
                    <Image 
                        width="50px"
                        height="50px"
                        className="profile"
                        src={`${endpoints.image}/${adminProfile.profile}`} 
                        title={adminProfile.name}
                        alt={adminProfile.name}
                    />
                    <h4 className="profile"> 
                        <p> { adminProfile.name } </p>
                        <p> <small> {adminProfile.email} </small> </p>
                    </h4>
                    <Button 
                        className="mx-3"
                        style={{ color: "#fff"}}
                        rounded
                        text
                        icon={"pi pi-power-off"}
                        onClick={() => logout()}
                    />
                </div>
            )}
        </>  
    )
}

export const AppToolbar = () => {
    return(
        <div className="app-toolbar">
            <Toolbar 
                className="primary-color toolbar"
                start={<StartContent />} 
                end={<EndContent />}
            />
        </div>
    )
}