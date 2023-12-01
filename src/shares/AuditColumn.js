import { datetime } from "../helpers/datetime";

export const AuditColumn = ({ col, value }) => {
  return (
    <>
      {(col.field === "created_at" ||
        col.field === "updated_at" ||
        col.field === "deleted_at") && (
        <label> {datetime.long(value[col.field])} </label>
      )}

      <label>{value[col.field] && value[col.field].name}</label>
    </>
  );
};
