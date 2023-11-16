import { InputText } from "primereact/inputtext"
import { useState } from "react";

export const Search = ({ onSearch, placeholder }) => {
    const [keyword, setKeyword] = useState('');

    return(
        <div className='col-12 md:col-4 lg:col-4 my-3'>
             <label> Press <b> Enter</b> key to search </label>
            <div className="p-inputgroup flex-1 mt-1">
                <InputText 
                    className="p-inputtext-sm"
                    placeholder={placeholder}
                    value={keyword}
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