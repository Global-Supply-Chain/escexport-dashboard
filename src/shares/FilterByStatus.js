import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const FilterByStatus = ({ status, onFilter, label, disabled }) => {
  const { statusFilter } = useSelector((state) => state.share);
  const [iniState, setIniState] = useState();

  useEffect(() => {
    if(!status.includes(statusFilter)){
        setIniState('ALL')
    }
  }, []);

  return (
    <div>
      <label htmlFor="status">{label}</label>
      {status && (
        <div className="form-group mt-1">
          <Dropdown
            inputId="status"
            name="status"
            className="p-inputtext-sm w-full"
            options={status ?? []}
            value={iniState ? iniState : statusFilter}
            tooltip="Filter by status"
            disabled={disabled}
            onChange={(e) => {
              onFilter(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
