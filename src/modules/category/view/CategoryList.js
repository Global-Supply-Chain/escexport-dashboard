import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { CategoryTable } from "../list/CategoryTable";

export const CategoryList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <CategoryTable />
      </div>
    </div>
  );
};
