import React from "react";
import { BreadCrumb } from "../../../shares/BreadCrumb";
import { MainCategoryTable } from "../list/MainCategoryTable";
import { Card } from "primereact/card";

export const MainCategoryList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
          <MainCategoryTable />
      </div>
    </div>
  );
};
