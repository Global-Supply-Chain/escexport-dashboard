import { Dropdown } from "primereact/dropdown";
import { useSelector } from "react-redux";

export const FilterByStatus = ({ status, onFilter }) => {
  const { statusFilter } = useSelector((state) => state.share);

  return (
    <div className="md:mx-3 mt-3 md:mt-0">
      <label> Filter By </label>
      {status && (
        <div className="form-group mt-1">
          <Dropdown
            className="p-inputtext-sm w-full"
            options={status ?? []}
            value={statusFilter}
            tooltip="Filter by status"
            onChange={(e) => {
              onFilter(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
};
