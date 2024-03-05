import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";

export const FilterByStatus = ({ status, onFilter, label, disabled }) => {
  const { statusFilter } = useSelector((state) => state.share);

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
            value={!status.includes(statusFilter) ? 'ALL' : statusFilter}
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
