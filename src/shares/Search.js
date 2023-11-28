import { InputText } from "primereact/inputtext"
import { useState } from "react";
import { tooltipOptions } from "../constants/config";

export const Search = ({ onSearch, placeholder, tooltipLabel }) => {
    const [keyword, setKeyword] = useState('');

    return(
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
                        if(e.key === 'Enter') {
                            onSearch(e.target.value);
                        }
                    }}
                />
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search"></i>
                </span>
            </div>
        </div>
    )
}