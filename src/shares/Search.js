import { InputText } from "primereact/inputtext"
import { useState } from "react";
import { tooltipOptions } from "../constants/config";

export const Search = ({ onSearch, placeholder, tooltipLabel }) => {
    const [keyword, setKeyword] = useState(localStorage.getItem('search'));

    return (
        <div>
            <label> Press <b> Enter</b> key to search </label>
            <div className="p-inputgroup flex-1 mt-1">
                <InputText
                    className="p-inputtext-sm"
                    placeholder={placeholder}
                    value={keyword}
                    tooltip={tooltipLabel}
                    tooltipOptions={tooltipOptions}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            onSearch(e.target.value);
                            localStorage.setItem('search', e.target.value);
                        }
                    }}
                />
                {
                    keyword?.length > 1 ? (
                        <span
                            className="p-inputgroup-addon"
                            onClick={() => {
                                localStorage.removeItem('search');
                                setKeyword("")
                                onSearch("")
                            }}
                        >
                            <i className="pi pi-times"></i>
                        </span>
                    ) : (
                        <span
                            className="p-inputgroup-addon"
                            onClick={() => onSearch(keyword)}
                        >
                            <i className="pi pi-search"></i>
                        </span>
                    )
                }
            </div >
        </div >
    )
}