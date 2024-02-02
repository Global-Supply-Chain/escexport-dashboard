import React, { useEffect, useState } from 'react'
import { payloadHandler } from '../helpers/handler';

export const MemberCardImg = ({ payload, setPayload, src = null, field }) => {
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState(src)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(src ? src : objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile, src])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    useEffect(() => {
        if(src !== null){
            setPreview(src)
        }
    }, [src])

    return (
        <div>

            <div
                className=" member-card-null"
                onClick={() => {
                    document.getElementById(field).click();
                }}
            >
                {
                    preview && (
                        <img
                            src={preview}
                            width={'100%'}
                            height={200}
                            style={{ borderRadius: '20px' }}
                        />
                    )
                }
            </div>
            <input
                id={field}
                type="file"
                accept="image/*"
                className=" hidden"
                onChange={(e) => {
                    if (e.target.files.length > 0) {
                        onSelectFile(e)
                        payloadHandler(payload, e.target.files[0], field, (updateValue) => {
                            setPayload(updateValue);
                        });
                    }
                }}
            />
        </div>
    )
}
