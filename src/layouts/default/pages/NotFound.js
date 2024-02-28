import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom"
import Logo from "../../../assets/images/logo.jpeg"

export const NotFound = () => {

    const navigate = useNavigate();

    return (
        <div
            style={{
                height: '100vh',
                overflow : 'hidden'
            }}
            className="flex align-items-center justify-content-center relative">

            <div>

                <div className=" not-found-circle-one"></div>
                <div className=" not-found-circle-two"></div>

                <div className="flex align-items-center justify-content-center">
                    <Image 
                        src={Logo} 
                        className="not-found-logo"
                        onClick={() => {
                            navigate("/");
                        }}
                    />
                </div>

                <h1>Oops, Not Found Page</h1>

            </div>

        </div>
    )
}