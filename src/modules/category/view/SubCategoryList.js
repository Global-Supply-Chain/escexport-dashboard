import { BreadCrumb } from "../../../shares/BreadCrumb";
import { SubCategoryTable } from "../list/SubCategoryTable";
import { SubCategoryCreate } from "../entry/SubCategoryCreate";

export const SubCategoryList = () => {
  return (
    <div className=" grid">
      <div className="col-12">
        <BreadCrumb />
      </div>

      <div className="col-12">
        <SubCategoryCreate />
      </div>

      <div className="col-12">
        <SubCategoryTable />
      </div>
    </div>
  );
};
