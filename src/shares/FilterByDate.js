import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Button } from "primereact/button";
import { useSelector } from "react-redux";

export const FilterByDate = ({ onFilter }) => {
  const currentDate = new Date();

  const { startFilterDate, endFilterDate } = useSelector(
    (state) => state.share
  );

  const [maxStartDate, setMaxStartDate] = useState(currentDate);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onFilterByDate = () => {
    onFilter({
      startDate: startDate ? startDate : startFilterDate,
      endDate: endDate ? endDate : endFilterDate,
    });
  };

  return (
    <div className="mt-3 md:mt-0">
      <label> Filter By Date </label>
      <div className="form-group mt-1 flex flex-column md:flex-row align-items-start md:align-items-end justify-content-start">
        <Calendar
          className="p-inputtext-sm md:mr-2 sm:w-full"
          placeholder="Select Start Date"
          selectionMode={"single"}
          disabledDates={[new Date(), maxStartDate]}
          maxDate={maxStartDate}
          value={startFilterDate ? startFilterDate : startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        />

        <Calendar
          className="p-inputtext-sm md:ml-2 sm:w-full mt-3 md:mt-0"
          placeholder="Select End Date"
          selectionMode={"single"}
          value={endFilterDate ? endFilterDate : endDate}
          maxDate={currentDate}
          onChange={(e) => {
            setMaxStartDate(e.target.value);
            setEndDate(e.target.value);
          }}
        />

        <div className="md:ml-3 mt-3 md:mt-0 flex gap-2 flex-row align-items-start justify-content-start">
          <Button
            size="small"
            icon="pi pi-check"
            severity="primary"
            outlined
            onClick={() => onFilterByDate()}
          />

          <Button
            size="small"
            icon="pi pi-sync"
            severity="danger"
            outlined
            onClick={() => onFilter({ startDate: "", endDate: "" })}
          />
        </div>
      </div>
    </div>
  );
};
