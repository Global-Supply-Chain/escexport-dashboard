import { useCallback, useEffect, useState } from "react";
import { endpoints } from "../constants/endpoints";

export const Thumbnail = ({ preview, onSelect }) => {

    const [src, setSrc] = useState(preview);
    const [payload, setPayload] = useState(null);

    const mounted = useCallback(() => {
        if (preview) {
            setSrc(`${endpoints.image}/${preview}`);
        }
    }, [preview]);

    const selectedFile = (e) => {
        setPayload(e.target.files[0]);
        onSelect(e.target.files[0]);
    }

    useEffect(() => {
        mounted();
    }, [mounted]);

    useEffect(() => {
        if(payload) {
            const objectUrl = URL.createObjectURL(payload);
            setSrc(objectUrl);
        }
    },[payload]);

    return (
        <>
            <div
                className=" custom-thumbnail"
                onClick={() => {
                    document.getElementById("profile").click();
                }}
            >
                {!src && <span className={'pi pi-image'}></span>}
                {src && (
                    <img
                        src={src}
                        width={100}
                        height={100}
                        style={{ 
                            borderRadius: '10px',
                            width: '100%',
                            height: '100%'
                        }}

                        alt='preview'
                        title='preview image'
                    />
                )}
                <input
                    id="profile"
                    type="file"
                    accept="image/*"
                    className=" hidden"
                    onChange={(e) => selectedFile(e)}
                />
            </div>
        </>
    )
}