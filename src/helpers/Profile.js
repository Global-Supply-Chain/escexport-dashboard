import React, { useEffect, useState } from 'react'
import { payloadHandler } from './handler';

export const Profile = ({ payload, setPayload, src = null, field }) => {
    const [source, setSource] = useState(src);

    useEffect(() => {
        let image = document.getElementById('avatar');
        if (src !== null) {
            image.hidden = false;
            image.src = src
        } else {
            image.hidden = true;
        }
        setSource(src)
    }, [src])

    return (
        <div>

            <div
                className=" custom-profile"
                onClick={() => {
                    document.getElementById("profile").click();
                }}
            >
                {
                    source === null &&
                    (
                        <span className={'pi pi-user'}></span>
                    )
                }
                <img id={'avatar'} width={100} height={100} style={{ borderRadius: '50%' }} />
            </div>
            <input
                id="profile"
                type="file"
                accept="image/*"
                className=" hidden"
                onChange={(e) => {
                    let image = document.getElementById('avatar');
                    if (e.target.files.length > 0) {
                        image.hidden = false
                        image.src = URL.createObjectURL(e.target.files[0])
                        setSource(URL.createObjectURL(e.target.files[0]));
                        payloadHandler(payload, e.target.files[0], field, (updateValue) => {
                            setPayload(updateValue);
                        });
                    } else {
                        image.hidden = true;
                    }
                }}
            />
        </div>
    )
}
