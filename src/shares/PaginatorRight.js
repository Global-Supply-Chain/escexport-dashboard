import { Checkbox } from "primereact/checkbox"
import { tooltipOptions } from "../constants/config";

export const PaginatorRight = ({show, onHandler}) => {
    return(
        <div className="flex align-items-center mx-2">
            <Checkbox 
                tooltip="Show Audit Columns"
                tooltipOptions={tooltipOptions}
                checked={show}
                value={show}
                onChange={(e) => onHandler(!e.target.value)}
            />
            <label htmlFor="ingredient1" className="ml-2">Audit Columns </label>
        </div>
    )
}